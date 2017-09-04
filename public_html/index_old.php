<?php define("doc_root", "."); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include doc_root . "/resources/html/meta.html"; ?>
    <title>Nick Pearson - Game Programmer</title>

    <!-- styles -->
    <link rel="stylesheet" href="./components/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="./resources/css/style.css"/>

    <!-- fonts -->
    <link href='https://fonts.googleapis.com/css?family=Abel|Press+Start+2P' rel='stylesheet' type='text/css'>
  </head>

  <body>
    <div class="container" id="main-container">
      <?php include doc_root . "/resources/html/navbar.php"; ?>

      <div class="content">
        <div class="jumbotron banner" id="main-video">
          <h2>Video Game Programmer</h2>
          <a href="./portfolio"><button type="button" class="btn btn-success" role="button" aria-haspopup="false">See my projects <i class="fa fa-gamepad" aria-hidden="true"></i></button></a>
        </div>

        <div class="row centered" id="summary">
          <div class="col-md-4">
            <div class="blob">
              <div class="blob-link">
                <a href="./portfolio/smugglers.php">
                  <i class="fa fa-trophy fa-4x" aria-hidden="true" style="color:#A47400;"></i>
                  <h4>2016 `Rising Star` Runner Up</h4>
                </a>
              </div>
              <p>
                UK game programming competition, made up of 3 stages testing C++ skills, a 2 week game jam and a final interview from members of Industry
              </p>
            </div>
          </div>

          <span class="visible-xs visible-sm" style="padding-top:10px;"></span>

          <div class="col-md-4">
            <div class="blob">
              <div class="blob-link">
                <a href="./portfolio/list.php?filter=uni">
                  <i class="fa fa-university fa-4x" aria-hidden="true" style="padding-top: 4px; color:#D80054;"></i>
                  <h4>MEng in Computer Science</h4>
                </a>
              </div>
              <p>
                I'm currently on a year out from the University of Bristol working as a Placement Programmer at Sumo Digital, I expect to return in 2017 to complete my degree in 2019
              </p>
            </div>
          </div>

          <span class="visible-xs visible-sm" style="padding-top:10px;"></span>

          <div class="col-md-4">
            <div class="blob">
              <div class="blob-link">
                <a href="./portfolio/list.php?filter=video">
                  <i class="fa fa-video-camera fa-4x" aria-hidden="true" style="padding-top: 4px;"></i>
                  <h4>Filming my Latest Project</h4>
                </a>
              </div>
              <p>
                When I get some spare time I work on my own game projects, and having been recording my progress
                on YouTube
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <?php include doc_root . "/resources/html/footer.html"; ?>

    <script>var nav_id = "home";</script>
    <?php include doc_root . "/resources/html/scripts.html"; ?>
  </body>
</html>
