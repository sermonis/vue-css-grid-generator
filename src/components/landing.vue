<template>
  <div class="landing">
  <div id="about" class="hero">
    <div class="navbar">
      <img src="../assets/logo.png" alt="octrace logo">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#grid" class="cta">Get Started</a></li>
      </ul>
    </div>
    <div class="content">
      <h1>CSS Grid Layout Generator</h1>
     <p>Easily build complex layouts in minutes for free</p>
     <a href="#grid" class="cta">Get Started</a>
    </div>
  </div>
  <div id="features" class="features">
    <img class="screen" src="../assets/Macbook.png" alt="Grid Builder">
    <h2>All the features you need</h2>
    <p class="description">Easy to use high-functional visual tool that helps you Build Complex Layouts In Minutes For Free</p>
    <ul>
      <li>
        <h3>
        <i class="fas fa-bezier-curve"></i>
          Visual</h3>
        <p>Experiment with the parameters to achieve your goals and learn the capabilities of css grids.</p>
      </li>
      <li>
        <h3><i class="fas fa-user-astronaut"></i>
        User-friendly</h3>
        <p>You will not be difficult to create even a very comprehensive grid structure, it is very simple to use</p>
      </li>
      <li>
        <h3><i class="fas fa-sliders-h"></i>
        Functional</h3>
        <p>Tweak basic parameters, create sub-levels of grid, achieve the most complex results</p>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
export default {
	name: 'landing'
};
</script>
<style lang="stylus" scoped>
.hero {
  background: url('../assets/BG.png') center / cover;
  height: 100vh;
  min-height: 900px;
  position: relative;

  h1 {
    margin: 0;
  }

  .content {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  a.cta, .navbar a.cta {
    height: 45px;
    line-height: 45px;
    text-decoration: none;
    display: inline-block;
    font-family: Poppins;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.2em;
    padding: 0 45px;
    background: white;
    color: #000;
    border: 2px solid #fff;
    border-radius: 45px;
    transition: all 0.2s;

    &:hover {
      background: transparent;
      color: #fff;
    }
  }

  .navbar {
    width: 1170px;

    @media (max-width: 1170px) {
      width: 100%;
    }

    img {
      height: 40px;
    }

    a {
      text-decoration: none;
      color: rgba(#fff, 0.9);
      margin-left: 50px;
      text-transform: uppercase;
      font-family: Poppins;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.2em;
    }

    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 140px;
    line-height: 140px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    ul {
      display: flex;
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  }

  .content {
    color: #fff;
    font-family: Poppins;

    h1 {
      font-family: Poppins;
      font-size: 60px;
      font-weight: 600;
      line-height: 38px;
    }

    p {
      font-family: Karla;
      color: #f5f5f5;
      text-transform: capitalize;
      font-size: 20px;
      font-weight: 400;
      margin-top: 41px;
      margin-bottom: 41px;
      line-height: 38px;
    }
  }
}

.features {
  background: #fff;
  text-align: center;
  font-family: Poppins;
  position: relative;

  .screen {
    position: absolute;
    left: 50%;
    top: -300px;
    transform: translateX(-50%);
  }

  h2, h3 {
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  h2 {
    font-size: 48px;
    padding-top: 400px;
  }

  .description {
    font-family: Karla;
    color: #444444;
    font-size: 18px;
    max-width: 480px;
    margin: 35px auto;
    line-height: 32px;
  }

  ul {
    padding-bottom: 100px;
    display: flex;
    justify-content: center;

    li {
      max-width: 280px;
      margin: 20px 50px;

      i {
        font-size: 27px;
        margin-right: 30px;
        color: rgb(114, 90, 172);
      }

      h3 {
        font-size: 22px;
        font-family: Poppins;
        font-weight: 500;
        display: flex;
        align-items: center;
        margin-top: 15px;
      }

      p {
        margin-top: 25px;
        font-family: Karla;
        color: #666666;
        letter-spacing: 0.03em;
        font-size: 16px;
        text-align: left;
        font-weight: 400;
        line-height: 28px;
      }
    }
  }
}
</style>
