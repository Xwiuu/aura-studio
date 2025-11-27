/**
 * AURÆ STUDIO - INTERACTIVE SCRIPT
 * Stack: GSAP Core + ScrollTrigger
 */

// 1. REGISTRO DE PLUGINS
// Importante: O ScrollTrigger deve ser carregado no HTML antes deste script.
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
       SECTION 1: THE AURA CURSOR (Luz Líquida)
       ========================================================================== */
  const aura = document.getElementById("aura-cursor");
  const dot = document.getElementById("cursor-dot");

  // Variáveis de posição
  let mouseX = 0,
    mouseY = 0;
  let auraX = 0,
    auraY = 0;

  // Escuta o movimento do mouse
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // O ponto preto (dot) segue instantaneamente (sem delay)
    gsap.to(dot, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
      overwrite: true,
    });
  });

  // Loop de Renderização (Ticker) para o efeito de arraste (Lag)
  // Isso cria a sensação de que a luz tem "peso" e flutua
  gsap.ticker.add(() => {
    // Fórmula de interpolação linear (LERP) para suavidade
    const dt = 1.0 - Math.pow(1.0 - 0.12, gsap.ticker.deltaRatio());

    auraX += (mouseX - auraX) * dt;
    auraY += (mouseY - auraY) * dt;

    gsap.set(aura, { x: auraX, y: auraY });
  });

  /* ==========================================================================
       SECTION 2: HERO INTRO (Animação de Entrada)
       ========================================================================== */
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // A. Fade in da Aura
  tl.from(aura, { scale: 0, opacity: 0, duration: 2 });

  // B. Subtítulo (Tracking animation - letras abrindo)
  tl.to(
    ".hero-subtitle",
    {
      opacity: 1,
      letterSpacing: "0.8em",
      duration: 2.5,
      ease: "power2.out",
    },
    "-=1.5"
  );

  // C. Título Principal (Letras subindo e girando)
  // Nota: Requer que cada letra esteja envolta em <span class="char">
  tl.fromTo(
    ".hero-title .char",
    { y: 150, opacity: 0, rotationX: -90, filter: "blur(10px)" },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      filter: "blur(0px)",
      stagger: 0.08, // Tempo entre cada letra
      duration: 1.8,
      ease: "expo.out",
    },
    "-=2"
  );

  // D. Manifesto Pequeno e Scroll Indicator
  tl.to(".hero-manifesto", { y: 0, opacity: 1, duration: 1.5 }, "-=1");
  tl.to(".scroll-indicator", { opacity: 0.6, duration: 1 }, "-=0.5");

  /* ==========================================================================
       SECTION 3: HERO INTERACTION (Letras Magnéticas)
       ========================================================================== */
  const chars = document.querySelectorAll(".hero-title .char");

  chars.forEach((char) => {
    char.addEventListener("mouseenter", () => {
      // Letra flutua e muda de cor
      gsap.to(char, {
        y: -30,
        scale: 1.1,
        color: "#666",
        duration: 0.4,
        ease: "back.out(1.7)",
      });
      // Aura expande e fica mais quente
      gsap.to(aura, {
        scale: 1.8,
        backgroundColor: "rgba(255, 160, 100, 0.25)",
        duration: 0.4,
      });
    });

    char.addEventListener("mouseleave", () => {
      // Volta ao normal
      gsap.to(char, {
        y: 0,
        scale: 1,
        color: "#1a1a1a",
        duration: 0.6,
        ease: "power2.out",
      });
      // Aura volta ao normal
      gsap.to(aura, {
        scale: 1,
        backgroundColor: "rgba(255, 200, 150, 0.15)",
        duration: 0.6,
      });
    });
  });

  /* ==========================================================================
       SECTION 4: MANIFESTO SCROLL (Blur to Focus)
       ========================================================================== */
  // Seleciona todas as linhas do manifesto
  const manifestoLines = gsap.utils.toArray(".manifesto-text");

  manifestoLines.forEach((line) => {
    gsap.to(line, {
      scrollTrigger: {
        trigger: line,
        start: "top 90%", // Animação começa quando o topo do elemento chega em 90% da viewport
        end: "bottom 40%",
        toggleActions: "play none none reverse",
        scrub: 1, // Suaviza a animação (1s de delay para acompanhar o scroll)
      },
      y: 0,
      opacity: 1,
      filter: "blur(0px)", // Remove o desfoque gradualmente
      duration: 1.5,
      ease: "power4.out",
    });
  });

  /* ==========================================================================
       SECTION 5: VELOCITY SKEW (Efeito Inércia no Scroll)
       ========================================================================== */
  let proxy = { skew: 0 };
  let skewSetter = gsap.quickSetter(".manifesto-text", "skewY", "deg"); // Otimização de performance
  let clamp = gsap.utils.clamp(-15, 15); // Limita a inclinação máx a 15 graus

  ScrollTrigger.create({
    onUpdate: (self) => {
      // Calcula a velocidade do scroll e converte em inclinação
      let skew = clamp(self.getVelocity() / -250);

      // Se houver velocidade, aplica o skew e depois retorna suavemente a 0
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 1,
          ease: "power3.out",
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    },
  });

  /* ==========================================================================
       SECTION 6: MAGNETIC WORD ("Emotions")
       ========================================================================== */
  const magneticText = document.querySelector('[data-magnetic="true"]');

  if (magneticText) {
    magneticText.addEventListener("mousemove", (e) => {
      const rect = magneticText.getBoundingClientRect();
      // Calcula distância do centro do elemento
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move o texto levemente em direção ao mouse
      gsap.to(magneticText, {
        x: x * 0.15,
        y: y * 0.25,
        rotation: x * 0.02,
        duration: 0.5,
        ease: "power2.out",
      });
      // Aura fica intensa
      gsap.to(aura, {
        scale: 2,
        backgroundColor: "rgba(255, 100, 50, 0.3)",
        duration: 0.3,
      });
    });

    magneticText.addEventListener("mouseleave", () => {
      // Efeito elástico ao soltar
      gsap.to(magneticText, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1.2, 0.4)",
      });
      gsap.to(aura, {
        scale: 1,
        backgroundColor: "rgba(255, 200, 150, 0.15)",
        duration: 0.6,
      });
    });
  }
  /* ==========================================================================
       SECTION 7: LIVING GALLERY (Parallax & Tilt)
       ========================================================================== */

  const galleryItems = gsap.utils.toArray(".gallery-item");

  galleryItems.forEach((item, i) => {
    // A. PARALLAX NO SCROLL (Cada imagem tem uma velocidade diferente)
    // O item par sobe mais rápido, o ímpar sobe mais devagar
    const speed = i % 2 === 0 ? -50 : 50;

    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // Suavidade extra
      },
      y: speed,
      ease: "none",
    });

    // B. REVEAL ANIMATION (Máscara abrindo)
    const wrapper = item.querySelector(".frame-wrapper");
    const info = item.querySelector(".frame-info");

    // Começa "fechado" (clip-path)
    gsap.fromTo(
      wrapper,
      { clipPath: "inset(100% 0% 0% 0%)" }, // Cortado embaixo
      {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
        clipPath: "inset(0% 0% 0% 0%)", // Abre totalmente
        duration: 1.5,
        ease: "power4.inOut",
      }
    );

    // Texto aparece depois
    gsap.to(info, {
      scrollTrigger: {
        trigger: item,
        start: "top 70%",
      },
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5,
    });

    // C. 3D TILT INTERACTION (O Efeito Surreal do Mouse)
    // Isso faz a imagem girar baseada na posição do cursor
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left; // Posição X dentro do elemento
      const y = e.clientY - rect.top; // Posição Y dentro do elemento

      // Calcula o centro
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calcula a rotação (limitada a 10 graus)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(wrapper, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: 1.02, // Leve pop-up
        duration: 0.5,
        ease: "power2.out",
      });

      // AURA REACTION (A luz fica mais intensa sobre a arte)
      gsap.to(aura, {
        scale: 2.5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        mixBlendMode: "difference",
      });
    });

    item.addEventListener("mouseleave", () => {
      // Volta ao normal
      gsap.to(wrapper, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(aura, {
        scale: 1,
        backgroundColor: "rgba(255, 200, 150, 0.15)",
        mixBlendMode: "multiply",
      });
    });
  });

  /* ==========================================================================
       SECTION 8: THE HORIZON TUNNEL (Horizontal Scroll)
       ========================================================================== */

  const horizonWrapper = document.querySelector("#horizon-wrapper");
  const horizonTrack = document.querySelector("#horizon-track");
  const panels = gsap.utils.toArray(".horizon-panel");

  // 1. O MOVIMENTO HORIZONTAL
  // Calcula o scroll baseado no número de painéis (3 painéis = 200% de movimento)
  const totalScroll = (panels.length - 1) * 100;

  const scrollTween = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1), // Move tudo para a esquerda
    ease: "none", // Linear para acompanhar o scroll perfeitamente
    scrollTrigger: {
      trigger: horizonWrapper,
      pin: true, // TRAVA a tela verticalmente
      scrub: 1, // Suaviza o movimento (1s delay)
      snap: 1 / (panels.length - 1), // Opcional: Faz "imã" em cada painel
      end: () => "+=" + horizonTrack.offsetWidth, // A duração do scroll é igual a largura total
    },
  });

  // 2. ANIMAÇÕES DENTRO DE CADA PAINEL
  // Queremos que os textos apareçam ou mudem conforme entram na tela

  // Painel 1 (Immersion) - Texto sobe
  gsap.to(".horizon-panel:nth-child(1) .horizon-text", {
    scrollTrigger: {
      trigger: "#horizon-wrapper",
      start: "top center",
      toggleActions: "play none none reverse",
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
  });

  // Painel 1 - Texto de apoio
  gsap.to(".horizon-panel:nth-child(1) p", {
    scrollTrigger: {
      trigger: "#horizon-wrapper",
      start: "top center",
    },
    opacity: 1,
    delay: 0.5,
    duration: 1,
  });

  // Painel 2 (Distortion) - Texto Cresce (Scale Up)
  // Usamos o containerTrigger para saber quando esse painel específico está visível no scroll horizontal
  gsap.fromTo(
    ".horizon-panel:nth-child(2) .horizon-text",
    { scale: 0.5, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      rotate: -5, // Leve inclinação para distorção
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".horizon-panel:nth-child(2)",
        containerAnimation: scrollTween, // VINCULA AO SCROLL HORIZONTAL
        start: "left center",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Painel 3 (Elevation) - Texto se junta (Letter Spacing)
  gsap.fromTo(
    ".horizon-panel:nth-child(3) .horizon-text",
    { letterSpacing: "2rem", opacity: 0, filter: "blur(20px)" },
    {
      letterSpacing: "-0.05em",
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".horizon-panel:nth-child(3)",
        containerAnimation: scrollTween, // VINCULA AO SCROLL HORIZONTAL
        start: "left center",
        toggleActions: "play none none reverse",
      },
    }
  );

  /* ==========================================================================
       SECTION 9: ENTROPY LAB (Chaos & Decryption)
       ========================================================================== */

  const chaosTitle = document.getElementById("chaos-title");
  const hackerText = document.getElementById("hacker-text");

  // 1. ESTADO INICIAL: CAOS TOTAL (Via GSAP Set)
  // Deixamos o texto borrado, esticado e separado
  gsap.set(chaosTitle, {
    filter: "blur(20px)",
    letterSpacing: "50px",
    scaleY: 2, // Esticado verticalmente
    skewX: 45, // Inclinado agressivamente
    opacity: 0.3,
  });

  // 2. INTERAÇÃO DO MOUSE (Hover para organizar)
  chaosTitle.addEventListener("mouseenter", () => {
    // Traz para a realidade (Ordem)
    gsap.to(chaosTitle, {
      filter: "blur(0px)",
      letterSpacing: "-10px", // Bem juntinho estilo kerning moderno
      scaleY: 1,
      skewX: 0,
      opacity: 1,
      color: "#ffffff",
      textShadow: "0px 0px 0px rgba(0,0,0,0)", // Remove aberração cromática
      duration: 0.8,
      ease: "expo.out",
    });

    // Aumenta a Aura violentamente
    gsap.to(aura, {
      scale: 4,
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Flash branco
      duration: 0.2,
    });
  });

  chaosTitle.addEventListener("mouseleave", () => {
    // Volta para o Caos (Entropia)
    gsap.to(chaosTitle, {
      filter: "blur(20px)",
      letterSpacing: "50px",
      scaleY: 2,
      skewX: 45,
      opacity: 0.3,
      textShadow: "10px 0 #f0f, -10px 0 #0ff", // Glitch forte
      duration: 1.5,
      ease: "power4.in",
    });

    // Aura volta ao normal
    gsap.to(aura, {
      scale: 1,
      backgroundColor: "rgba(255, 200, 150, 0.15)",
      duration: 0.5,
    });
  });

  // 3. EFEITO HACKER / DESCRIPTOGRAFIA (Custom Function)
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  // Função que roda o efeito
  const runHackerEffect = (element) => {
    let iterations = 0;
    const targetText = element.dataset.value; // Pega o texto final do HTML

    // Intervalo que troca as letras
    const interval = setInterval(() => {
      element.innerText = targetText
        .split("")
        .map((letter, index) => {
          // Se já passou da iteração, fixa a letra correta
          if (index < iterations) {
            return targetText[index];
          }
          // Senão, mostra caractere aleatório
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      // Controla a velocidade da revelação
      if (iterations >= targetText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3; // Quanto menor o número, mais demorado o efeito
    }, 30); // Velocidade do loop (ms)
  };

  // Gatilho do ScrollTrigger para disparar o efeito hacker
  ScrollTrigger.create({
    trigger: "#entropy-lab",
    start: "top 60%", // Quando a seção estiver 60% visível
    onEnter: () => {
      gsap.to(hackerText, { opacity: 1, duration: 0.5 });
      runHackerEffect(hackerText);
    },
  });

  /* ==========================================================================
       SECTION 10: FOOTER SYSTEM (Live Data)
       ========================================================================== */

  // 1. RELÓGIO UTC AO VIVO
  function updateClock() {
    const now = new Date();
    const timeString = now.toISOString().split("T")[1].split(".")[0];
    const dateString = now.toISOString().split("T")[0];
    document.getElementById(
      "utc-clock"
    ).innerText = `${dateString} // ${timeString} UTC`;
  }
  setInterval(updateClock, 1000);
  updateClock(); // Chama imediatamente

  // 2. SESSION ID GENERATOR (Visual Tech)
  // Gera uma string aleatória hex para parecer um ID de servidor
  const sessionId = Math.random().toString(16).substr(2, 8).toUpperCase();
  document.getElementById("session-id").innerText = `0x${sessionId}`;

  // 3. ANIMAÇÃO DE REVEAL DO FOOTER
  gsap.from("footer div", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
    },
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
  });
});
