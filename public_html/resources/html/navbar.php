<nav class="navbar navbar-default navbar-fixed-top" onload="ActivateNavBar()"> <!-- Main Navigation -->
  <div class="container">
    <a class="navbar-brand" href="<?php echo doc_root; ?>/index.php">Nick Pearson</a>

    <div class="visible-xs navbar-right"> <!-- phone navigation -->
      <button type="button" class="dropdown-toggle navbar-toggle collapsed" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bars" aria-hidden="true"></i> Menu</button>
      <ul class="dropdown-menu">
        <li><a href="<?php echo doc_root; ?>/index.php">Home</a></li>
        <li><a href="<?php echo doc_root; ?>/portfolio/">Portfolio</a></li>
        <li><a href="<?php echo doc_root; ?>/contact.php">Contact</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#">Bio</a></li>
        <li><a href="#">Tutorials</a></li>
      </ul>
    </div>

    <div class="hidden-xs navbar-right"> <!-- desktop navigation -->
      <ul class="nav nav-pills">
        <li role="presentation" id="nav-home"><a href="<?php echo doc_root; ?>/index.php">Home</a></li>
        <li role="presentation" id="nav-portfolio"><a href="<?php echo doc_root; ?>/portfolio">Portfolio</a></li>
        <li role="presentation" id="nav-contact"><a href="<?php echo doc_root; ?>/contact.php">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>

<span class="visible-xs" style="padding-top:5px;"></span> <!-- hack to take account of the growing menu bar -->
