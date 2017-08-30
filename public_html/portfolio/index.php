<?php define("doc_root", ".."); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include doc_root . "/resources/html/meta.html"; ?>
    <title>Nick Pearson - Porfolio</title>

    <!-- styles -->
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../resources/css/style.css"/>

    <!-- fonts -->
    <link href='https://fonts.googleapis.com/css?family=Abel|Press+Start+2P' rel='stylesheet' type='text/css'>
    <script src="https://use.fontawesome.com/d0bcbf8988.js"></script>

    <style type="text/css">
    @media screen and (max-width: 992px) {
      .blob h1 {
        text-align: center;
      }
    }
    </style>
  </head>

  <body>
    <div class="container" id="main-container">
      <?php include doc_root . "/resources/html/navbar.php"; ?>

      <div class="content">
        <div class="title-block">
          <h1>Portfolio</h1>
          <p>In my time in the industry I've been lucky to work on a variaty of projects, and I'm as comfortable on an indie project as I am on a large AAA team</p>
          <p>These are my most recent major projects, <a href = "./portfolio/list.php">click here to see a full list</a></p>
        </div>

        <!-- DI2 -->
        <div class="blob">
          <div class="row">
            <div class="col-md-12 visible-xs visible-sm">
                <h1> Dead Island 2 (Sumo Digital, 2016 - 2017)</h1>
            </div>

            <div class="col-md-4">
                <div class="fader hidden-xs hidden-sm"></div>
                <img src = "../resources/image/DI2_Gamescon.jpg" width="100%" class="profile-img"/>
            </div>

            <div class="col-md-8">
              <h1 class="hidden-xs hidden-sm">Dead Island 2 (2018)<br/>Sumo Digital, 2016 - 2017</h1>

              <p>I am some description text, blah blah blah</p>

              <p class="anc-r"><a href="./portfolio/di2.php">Read More </a></p>
              <span class="visible-xs visible-sm" style = "margin-top:50px;"></span>
            </div>
          </div>
        </div>

        <!-- Smuggler's Paradise -->
        <div class="blob">
          <div class="row">
            <div class="col-md-12 visible-xs visible-sm">
                <h1> Smuggler's Paradise (Rising Star Code Competition, 2016)</h1>
            </div>

            <div class="col-md-4 visible-xs visible-sm">
                <div class="fadel hidden-xs hidden-sm"></div>
                <img src = "../resources/image/smugglers0.png" width="100%" class="profile-img"/>
            </div>

            <div class="col-md-8" style="padding-left:20px;">
              <h1 class="hidden-xs hidden-sm">Sumggler's Paradise (2016)<br/>Rising Star Code Competition</h1>

              <p>I am some description text, blah blah blah</p>

              <p class="anc-r"><a href="./portfolio/smugglers.php">Read More </a></p>
              <span class="visible-xs visible-sm" style = "margin-top:50px;"></span>
            </div>

            <div class="col-md-4 hidden-xs hidden-sm">
                <div class="fadel hidden-xs hidden-sm"></div>
                <img src = "../resources/image/smugglers0.png" width="100%" class="profile-img"/>
            </div>
          </div>
        </div>

        <!-- Transport Game -->
        <div class="blob">
          <div class="row">
            <div class="col-md-12 visible-xs visible-sm">
                <h1> Transport Game (2015 - present)</h1>
            </div>

            <div class="col-md-4">
                <div class="fader hidden-xs hidden-sm"></div>
                <img src = "../resources/image/DI2_Gamescon.jpg" width="100%" class="profile-img"/>
            </div>

            <div class="col-md-8">
              <h1 class="hidden-xs hidden-sm">Transport Game (2015 - present)<br/>Current YouTube Game Series</h1>

              <p>I am some description text, blah blah blah</p>

              <p class="anc-r"><a href="./portfolio/transport.php">Read More </a></p>
              <span class="visible-xs visible-sm" style = "margin-top:50px;"></span>
            </div>
          </div>
        </div>

        <div class="title-block">
          <p>For projects earlier than 2015, see the <a href="./list.php">full project list</a></p>
        </div>

      </div>
    </div>

    <?php include doc_root . "/resources/html/footer.html"; ?>

    <script>var nav_id = "portfolio";</script>
    <?php include doc_root . "/resources/html/scripts.html"; ?>
  </body>
</html>
