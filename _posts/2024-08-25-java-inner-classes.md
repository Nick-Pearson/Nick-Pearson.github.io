---
layout: post
tags: ["Java", "JVM", "Classes", "Inner Classes"]
title: "How Inner Classes got refactored in Java 11"
---

Inner classes are a crucial part of java programming. They allow us to create namespaces within classes, and they have a special relationship to their parent which permits access to private methods and fields. This would not be allowed for a top level class

Consider the following example

```java
class Outer {
    // (1)
    private static String A = "my-prefix-";
    private long b;

    // (2)
    private String formatKey(String input) {
        ...
    }

    class Inner {
        // (3)
        private long c;

        // (4)
        private Inner()
        {
        }
    }
}

```

 * (1) `Inner` is allowed to access `A` and `b` in `Outer`
 * (2) `Inner` is allowed to call the private method `formatKey`
 * (3) `Outer` is allowed to access the private member variable `c`
 * (4) `Outer` is allowed to call the private constructor of `Inner`

Although the functionality remained totally the same, the guts of how inner classes work was overhauled in Java 11 for an interesting reason

## It starts with Java 1.1

Back in January 1996 _Sun Microsystems Inc._ released Java 1.02, widely regarded as the first 'stable' edition of the language. Alongside this original version Sun published 'the red book' which contained a detailed specification for how you might implement a Java Virtual Machine as well as a set of tests to prove that an implementation was correct. At this point it was expected that implementers would write their own JVMs rather than use a standard one provided by Sun.

Fast forward a year to Feburary 1997 to the release of Java 1.1 which included a significant number of new features; **but crucially did not require a new JVM specification**. This posed the challenge of implementing new syntax such as Inner Classes in a way that was compatible with the existing virtual machine and class file format.

{: .box-note}
**Note:** Java 1.1 actually did add a new `InnerClasses` attribute to the class file format. [JVMs are required to ignore attributes they do not recognise](https://web.archive.org/web/20080907222800/http://java.sun.com/docs/books/jvms/second_edition/html/ClassFile.doc.html#79996), so older 1.02 implementations would simply discard the `InnerClasses` section

## Synthetic methods

Lets look back at the example from earlier, say `Inner` wanted to call the private method `formatKey`

```java
class Outer {    
    private String formatKey(String input) {
        return input + "-key";
    }

    class Inner {
        public String key() {
            return formatKey("inner");
        }
    }
}
```

If we compiled and ran this as is, the Java 1.02 JVM would be required to throw an `IllegalAccessError` as soon as we tried to call `formatKey`. It is forbidden to call private methods from another class and this must be enforced by the JVM. To circumvent this, the Java compiler adds an extra method to `Outer` that has the sole purpose of exposing `formatKey` publically. Methods that are added by the compiler are known as `synthetic`. We can see this by compiling the above example targetting java 8

```
$ javac Outer.java --source 8 --target 8
```

Observe that we get two class files created, one for the inner and one for the outer class

```
$ ls
'Outer$Inner.class'   Outer.class   Outer.java
```

We can use the `javap` utility to see what is going on inside of Outer, with the `-p` option to show private methods

```
$ javap -p Outer.class 
Compiled from "Outer.java"
class Outer {
  Outer();
  private java.lang.String formatKey(java.lang.String);
  static java.lang.String access$000(Outer, java.lang.String);
}
```

The compiler has added a new package private method `access$000` that is exposing formatKey for us to use in our inner class. These methods are sometimes known as an 'access bridge'


## Why change this?

21 years after the original release, _OpenJDK_ changed the way inner classes function within the JVM as part of Java 11. So why would they change this?

Well using syntehtic methods has some downsides:
 * **Reflection does not work properly:** If I try to access `formatKey` via reflection I will still get an error even though I could access the method in source code. This is inconsistent
 * **It limits future enhancements to the langauge:** Java 8 lambdas were made much more difficult to implement due to the nature of synthetic access methods
 * **We are breaking encapsulation:** Adding synthetic access methods is specifically trying to avoid encapsulation
 * **It makes our compiled code slightly bigger:** Every synthetic method must be shipped as part of our application, which creates bloat
 * **It makes our code slightly worse:** Adding an extra method call could introduce some overhead, however this may have been optimised by some jvms

The new way added in [JEP 181](https://openjdk.org/jeps/181) is to introduce Inner Classes as a primary feature of the JVM. This extended the class file to allow the JVM to understand the relationship between nested inner and outer classes so that it could handle them correctly.

Looking at the same example targetting Java 11

```
$ javap -p Outer.class 
Compiled from "Outer.java"
class Outer {
  Outer();
  private java.lang.String formatKey(java.lang.String);
}
```

The `access$000` method has disappeared as there is no need for it anymore. Instead the class file contains two new attributes:
 * `NestHost`: a reference to the outer class for a given inner class
 * `NestMembers`: the list of inner classes that this class contains

{: .box-note}
**Note:** Conversely to the `InnerClasses` attribute; JVMs _are_ required to process these attributes

This new method allows the JVM to fix the above issues around reflection as it has visibility of the original structure, and it means modern compilers no longer need to generate sythetic 'access bridge' methods for inner classes.