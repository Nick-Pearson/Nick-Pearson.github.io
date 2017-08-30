<?php define("doc_root", "."); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include doc_root . "/resources/html/meta.html"; ?>
    <title>Thank You!</title>

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
          <div class = "col-md-3"></div>
          <div class = "col-md-6 title-block">
            <h1>Thank you for your message</h1>
            <p>
              I will get back to you via email as soon as possible. If you require a quicker response, please send a message via my facebook page
            </p>
          </div>
        </div>
      </div>
    </div>

    <?php include doc_root . "/resources/html/footer.html"; ?>

    <script>var nav_id = "contact";</script>
    <?php include doc_root . "/resources/html/scripts.html"; ?>
  </body>
</html>
