<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>devilhood — instance of a specified state</title>
  <meta name="description" content="Music, experiments and other worlds by Pawel Osmolski. An independent portal to devilhood's creative universe.">
  <meta property="og:title" content="devilhood — instance of a specified state">
  <meta property="og:image" content="https://www.devilhood.com/images/devilhood_logo.jpg">
  <link rel="icon" href="favicon.ico">
  <link rel="preload" href="/fonts/The-Dreamer.woff" as="font" type="font/woff" crossorigin>
  <link rel="stylesheet" href="css/site.css?v=<?= filemtime( 'css/site.css' ); ?>">
  <script src="js/site.js?v=<?= filemtime( 'js/site.js' ); ?>" defer></script>
  <script src="js/portal-experiment.js?v=<?= filemtime( 'js/portal-experiment.js' ); ?>" defer></script>
</head>
<body>
  <a class="skip" href="#worlds">Skip to the worlds</a>
  <header class="masthead">
    <a class="brand" href="./" aria-label="devilhood home"><img src="images/devilhood_logo_text_inverted.png" alt="devilhood" width="911" height="223"></a>
    <span class="mast-note">instance of a specified state</span>
    <nav aria-label="Main navigation"><a href="media.php">Media archive ↗</a><a href="mailto:pawel@pawel-osmolski.com">Say hello ↗</a></nav>
  </header>
  <main>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy"><p class="eyebrow"><span class="signal-dot"></span> Independent transmissions / <span class="eyebrow-author">Pawel Osmolski</span></p>
        <h1 id="hero-title"><span class="headline-plain">a little<br>out of</span><br><em>frequency</em></h1>
        <p class="intro">A collection of worlds, connected by a loose thread.</p>
        <a class="explore" href="#worlds">Follow the thread <span>↓</span></a>
      </div>
      <div class="art"><canvas id="contours" aria-hidden="true"></canvas><div class="art-photo" aria-hidden="true"></div><button class="art-trigger" type="button" aria-label="Explore portal photographs" aria-expanded="false" hidden></button><span class="art-label" aria-hidden="true">FIG. 01 / A SIGNAL IN THE NOISE</span><span class="art-coordinate" aria-hidden="true">51° N<br>∞ Hz</span></div>
      <span class="margin-note" aria-hidden="true">MAKE THE WAY FOR WINGS SO YOU DON'T NEED TO RUN</span>
    </section>
    <section class="worlds" id="worlds" aria-labelledby="worlds-title">
      <div class="section-heading"><h2 id="worlds-title">Choose a world.</h2><span>06 doors / one loose thread</span></div>
      <div class="world-list">
        <a class="world" href="https://www.pawel-osmolski.com/radiohead-remixes" data-image="images/radiohead-background-twisted.jpg"><span class="world-number">01</span><span class="world-name">radiohead remixes</span><span class="world-type">Reassembled / reimagined</span><span class="world-arrow">↗</span></a>
        <a class="world" href="https://www.filiposcar.com" data-image="images/filiposcar.jpg"><span class="world-number">02</span><span class="world-name world-name-strong">FILIP OSCAR</span><span class="world-type">Another voice</span><span class="world-arrow">↗</span></a>
        <a class="world" href="https://www.pawel-osmolski.com" data-image="images/pawel-osmolski-glasses-right.jpg"><span class="world-number">03</span><span class="world-name world-name-strong">PAWEL OSMOLSKI</span><span class="world-type">Music / composition</span><span class="world-arrow">↗</span></a>
        <a class="world" href="media.php" data-image="images/devilhood-background-latin.jpg"><span class="world-number">04</span><span class="world-name">Media archive</span><span class="world-type">Trinkets &amp; treasures</span><span class="world-arrow">↗</span></a>
        <a class="world" href="https://www.crownandcraft.com" data-image="images/crownandcraft-background-microphone.jpg"><span class="world-number">05</span><span class="world-name">Crown &amp; Craft</span><span class="world-type">From the studio</span><span class="world-arrow">↗</span></a>
        <a class="world" href="https://www.crunchalias.com" data-image="images/crunchalias-background-rockgarden.jpg"><span class="world-number">06</span><span class="world-name">CrunchAlias</span><span class="world-type">Electric memories</span><span class="world-arrow">↗</span></a>
      </div>
      <p class="postscript">Everything leaves an echo<span aria-hidden="true">⤳</span></p>
    </section>
  </main>
  <footer class="footer"><span>© <?php echo date('Y'); ?> Pawel Osmolski</span><span>Somewhere between order &amp; noise.</span><button class="motion-toggle" type="button" aria-pressed="false" hidden>Pause motion</button></footer>
</body>
</html>
