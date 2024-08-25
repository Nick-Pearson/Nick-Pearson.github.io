
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