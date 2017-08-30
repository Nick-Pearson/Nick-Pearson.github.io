<?php
define("doc_root", ".");

$sent = 0;

if(isset($_POST['email0'])) {
  $sent = 2;
  $email = $_POST['email0'];

  if(isset($_POST['name0'])) {
    $name = htmlspecialchars($_POST['name0']);
  }
  else {
    $name = '';
    $nameclass = 'invalid';
  }

  if(isset($_POST['message0'])) {
    $message = htmlspecialchars($_POST['message0']);
  }
  else {
    $message = '';
    $messageclass = 'invalid';
  }

  if($email != '' && $name != '' && $message != '') {
    $sent = 1;
    $headers = "From: nick@pearsoncgi.net\r\n".
              'Reply-To: '.$email."\r\n" .
              'Content-type: text/html \r\n' .
              'X-Mailer: PHP/' . phpversion();
    $email_message = "<html>\n<head>\n<link href='http://pearsoncgi.net/emailstyle.css' rel='stylesheet'>\n</head>\n<body>\n<div class='centrediv'>\n<h3>A new message has been submitted: </h3>\n<b>Name:</b>";
    $email_message .= $name;
    $email_message .= "\n<b>Email:</b> " . $email;
    $email_message .= "\n<b>Message:</b>\n" . $message;
    $email_message .= "</div>\n</body>\n</html>";

   @mail("nick@pearsoncgi.net", "Contact Form Posted on PearsonCGI.net", $email_message, $headers);
   header("Location: " . $_SERVER["SCRIPT_URI"] . "/" . doc_root . "/sent.php");
   die();
 }
} ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include doc_root . "/resources/html/meta.html"; ?>
    <title>Nick Pearson - Contact</title>

    <!-- styles -->
    <link rel="stylesheet" href="./components/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="./resources/css/style.css"/>

    <!-- fonts -->
    <link href='https://fonts.googleapis.com/css?family=Abel|Press+Start+2P' rel='stylesheet' type='text/css'>
    <script src="https://use.fontawesome.com/d0bcbf8988.js"></script>
  </head>

  <body>
    <div class="container">
      <?php include doc_root . "/resources/html/navbar.php"; ?>

      <div class="content">
        <div class="row">
          <div class="col-md-6">
            <h1>Send me a message</h1>
            <form action="/contact.php" method="POST" id="contact-form">
              <input type="text" name="name0" class="form-control <?php echo $nameclass; ?>" value="<?php echo $name; ?>" placeholder="Name"><br>
              <input type="email" name="email0" class="form-control" value="<?php echo htmlspecialchars($email); ?>" placeholder="Email Address"><br>
              <textarea name="message0" cols="40" rows="5" class="form-control <?php echo $messageclass; ?>" value="<?php echo $message; ?>" placeholder="Message"></textarea><br>
              <button type="reset" class="btn btn-medium" style="display:none;">Clear</button>
              <button type="submit" class="btn btn-medium btn-success"><i class='fa fa-envelope'></i> Send</button>
            </form>
          </div>

          <div class="col-md-6">
            <h1>Add me on Social Media</h1>
            <div class="row">
              <div class="col-md-4 iconcont">
                <a href="http://uk.linkedin.com/pub/nick-pearson/64/776/340" target="_blank"><i class="fa fa-linkedin-square fa-5x liblue"></i></a>
              </div>
              <div class="col-md-4 iconcont">
                <a href="http://www.youtube.com/user/pearsproductions" target="_blank"><i class="fa fa-youtube-play fa-5x ytred"></i></a>
              </div>
              <div class="col-md-4 iconcont">
                <a href="http://www.facebook.com/PearsonProductionsUk" target="_blank"><i class="fa fa-facebook-official fa-5x fbblue"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <?php include doc_root . "/resources/html/footer.html"; ?>

    <script>var nav_id = "contact";</script>
    <?php include doc_root . "/resources/html/scripts.html"; ?>

    <!-- Manage the validation of contact form fields -->
    <script>
      function ValidateInputFields()
      {
        var form = $("#contact-form");
        //TODO: Show/Hide the reset button based on if any fields are filled
      }
    </script>
  </body>
</html>
