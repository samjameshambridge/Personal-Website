(function jsIIFE() {
  // call init on dom load
  document.addEventListener("DOMContentLoaded", initPage);

  // maxtween animations
  const tweenAnims = {
    init: function() {
      // landing page animations
      TweenMax.fromTo(
        ".profile-pic",
        3,
        {
          x: "-20vw",
          ease: Elastic.easeOut
        },
        {
          x: 0,
          ease: Elastic.easeOut
        }
      );
      TweenMax.fromTo(
        ".landing-titles-name, .landing-titles p",
        3,
        {
          y: "20vw",
          ease: Elastic.easeOut
        },
        {
          y: 0,
          ease: Elastic.easeOut
        }
      );
      TweenMax.from(".landing-titles-github", 1, {
        delay: 5,
        opacity: 0,
        ease: Power0.easeIn
      });

      this.scrollMagicker();
    },

    scrollMagicker: function() {
      // init scrollmagic
      var controller = new ScrollMagic.Controller();

      var scene1 = new ScrollMagic.Scene({
        triggerElement: "#skills"
      })
        .setClassToggle(".animating-logo", "reveal")
        .addTo(controller);

      var scene2 = new ScrollMagic.Scene({
        triggerElement: "#about"
      })
        .setClassToggle(".about-bottom-row, .about-top-row", "reveal")
        .addTo(controller);
    }
  };

  // type effect for landing page
  const typeCtrl = {
    init: function(txtElement, words, typeSpeed) {
      this.txtElement = txtElement; //DOM element
      this.words = words; /*Front End Developer*/
      this.typeSpeed = typeSpeed;
      this.isTyping = false; //differentiate between waiting and typing
      this.hasDeleted = false; //to differentitiate between after and before the decrememnt
      this.i = 0; //increment counter
      this.d = 1; //decrement counter
    },

    type: function() {
      const blue = "rgb(76, 122, 145)",
        transparent = "transparent";

      var interval = setInterval(() => {
        if (
          this.i === 0 ||
          this.i === 2 ||
          this.i === 4 ||
          this.i === 6 ||
          this.i === 23 ||
          this.i === 25
        )
          this.borderColor(blue);

        if (
          this.i === 1 ||
          this.i === 3 ||
          this.i === 5 ||
          this.i == 22 ||
          this.i === 24
        )
          this.borderColor(transparent);

        if (this.i >= 7 && this.i <= 15) {
          this.isTyping = true;
          this.incrementCharacterCtrl();
        }

        if (this.i === 16) {
          this.txtElement.innerHTML = "Front-End&nbsp";
          this.borderColor(blue);
        }

        if (this.i >= 17 && this.i <= 23) this.incrementCharacterCtrl();

        if (this.i >= 28 && this.i <= 31) this.decrementCharacterCtrl();

        if (this.i >= 32) {
          this.hasDeleted = true;
          this.words = "Front-End Developer";
          this.incrementCharacterCtrl();
        }

        // end of run through
        // if loop is finished, clear interval
        if (this.i === 36) {
          clearInterval(interval);
          setTimeout(this.borderColor(transparent), 2000);
        }
        // if loop is not finished, add one to the counter
        else this.i++;
      }, this.typeSpeed);
    },

    borderColor: function(color) {
      this.txtElement.style.borderRight = `solid 2px ${color}`;
    },

    //increment the character for a typing effect
    incrementCharacterCtrl: function() {
      const blue = "rgb(76, 122, 145)",
        txt = this.words.toString();

      if (this.isTyping) {
        this.txtElement.innerHTML = txt.substring(0, this.i - 6);
        this.borderColor(blue);
      }

      if (this.hasDeleted) {
        this.txtElement.innerHTML = txt.substring(0, this.i - this.d - 8);
      }
    },

    // take away character for a cursor deleting effect
    decrementCharacterCtrl: function() {
      const txt = this.words.toString();

      this.txtElement.innerHTML = txt.substring(0, this.i - this.d - 11);

      this.d += 2;
    }
  };

  // skills animations
  const skillImgCtrl = {
    init: function(originalClass, images) {
      // this.originalClass = originalClass;
      this.images = images;

      images.forEach(image =>
        image.addEventListener("mouseover", this.imgActive)
      );
    },

    imgActive: function() {
      // skillImgCtrl.deactivateImages();
      skillImgCtrl.textHandler(this);
    },

    // deactivateImages: function() {
    //   this.images.forEach(image => {
    //     image.className = this.originalClass;
    //   });
    // },

    textHandler: function(image) {
      const id = image.getAttribute("data-id");

      // these are all classnames defined in the css
      document
        .querySelectorAll(".image-text-set div")
        .forEach(textBox =>
          textBox.getAttribute("data-text") === id
            ? (textBox.className = "active-text")
            : (textBox.className = "group")
        );
    }
  };

  // init app
  function initPage() {
    const txtElement = document.querySelector(".txt-type"),
      words = JSON.parse(txtElement.getAttribute("data-words")),
      typeSpeed = txtElement.getAttribute("data-wait"),
      originalClass = "img img-fluid rounded-circle m-5",
      images = document.querySelectorAll(".image-set img");

    // init animations
    tweenAnims.init();

    // init type ctrl
    typeCtrl.init(txtElement, words, typeSpeed);
    typeCtrl.type();

    // init skill img ctrl
    skillImgCtrl.init(originalClass, images);
  }
})();
