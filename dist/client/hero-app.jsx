const { useEffect, useRef, useState } = React;

function OrbitalField({ reducedMotion }) {
  return (
    <div className={`orbital-field ${reducedMotion ? 'is-reduced' : ''}`} aria-hidden="true">
      <div className="energy-aura" />
      <div className="background-planets">
        <div className="planet-sphere sphere-amber" />
        <div className="planet-sphere sphere-blue" />
        <div className="planet-sphere sphere-lilac" />
        <div className="planet-sphere sphere-pearl" />
      </div>
      <div className="orbit orbit-one"><span className="planet planet-gold" /><span className="planet planet-amber" /></div>
      <div className="orbit orbit-two"><span className="planet planet-lilac" /><span className="planet planet-rose" /></div>
      <div className="orbit orbit-three"><span className="planet planet-blue" /><span className="planet planet-cyan" /></div>
      <div className="orbit orbit-four"><span className="planet planet-pearl" /><span className="planet planet-small" /></div>
      <svg className="choice-path" viewBox="0 0 900 560" preserveAspectRatio="none">
        <path id="choiceRoute" className="path-under" d="M 960 120 C 770 130, 700 220, 575 320 S 320 480, 72 474" />
        <path className="path-main" d="M 960 120 C 770 130, 700 220, 575 320 S 320 480, 72 474" />
        <path className="path-echo" d="M 950 155 C 760 180, 688 263, 560 345 S 300 500, 95 492" />
        <circle className="path-traveler" r="5">
          <animateMotion dur="5.2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#choiceRoute" />
          </animateMotion>
        </circle>
      </svg>
      <div className="route-beacon" />
      <div className="text-orbits">
        <span className="text-orbit text-orbit-a"><i /></span>
        <span className="text-orbit text-orbit-b"><i /></span>
        <span className="text-orbit text-orbit-c"><i /></span>
      </div>
      <div className="sparkles">
        {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i }} />)}
      </div>
    </div>
  );
}

function LandingSections() {
  const services = [
    { number: '01', title: 'Ведическая астрология', text: 'Натальная карта, прогнозы, Прашна и ректификация — чтобы увидеть свои опоры и следующий шаг.', price: 'от 1 500 ₽', details: ['Натальная карта — 4 000 ₽', 'Годовой прогноз — 6 500 ₽', 'Прашна — 1 600 ₽', 'Совместимость — 4 000 ₽'] },
    { number: '02', title: 'Регрессия', text: 'Мягкая встреча с глубинной историей, чувствами и повторяющимися сценариями. Не чинить себя — вернуть себя.', price: '3 000 ₽', details: ['Индивидуальная сессия', 'Продолжительность — около 2 часов', 'Запись встречи остаётся у вас'] },
    { number: '03', title: 'Системные расстановки', text: 'Посмотреть на отношения, родовые связи и внутренние конфликты так, чтобы в системе снова появилось движение.', price: '5 000 ₽', details: ['Индивидуальная работа', 'Отношения и семейные сценарии', 'Родовые и повторяющиеся темы'] },
    { number: '04', title: 'Кундалини Рейки', text: 'Бережная работа с состоянием, энергией и ощущением внутреннего ресурса.', price: 'от 1 300 ₽', details: ['Один сеанс — 1 300 ₽', 'Обучение на Мастера — 23 000 ₽', 'Сопровождение на месяц — 14 990 ₽'] },
  ];

  const testimonials = [
    '«После регресса я впервые смогла сказать своё мнение — и мы не поскандалили. Появилось уважение ко мне».',
    '«Так подробно и точно. Я получила именно то, что нужно было услышать, и многое встало на свои места».',
    '«После сеанса стало легко и спокойно. Как будто груз с души ушёл, и снова захотелось двигаться».',
  ];

  return (
    <>
      <section className="site-section philosophy-section reveal" id="about">
        <div className="section-kicker reveal">О подходе</div>
        <div className="philosophy-grid reveal">
          <h2>Не искать,<br /><em>за что.</em><br />Увидеть, куда.</h2>
          <div className="philosophy-copy">
            <p>Я не обещаю готовых ответов и не веду вас по чужому сценарию. Мы смотрим туда, где остановилось движение, и находим вашу точку выбора.</p>
            <p>Иногда это происходит через карту рождения. Иногда — через тело, образ, разговор или тишину. Каждый путь начинается с честной встречи с собой.</p>
            <div className="signature-line"><span /> Любовь Стёпина</div>
          </div>
        </div>
      </section>

      <section className="site-section services-section reveal" id="services">
        <div className="section-heading reveal">
          <div className="section-kicker">Направления работы</div>
          <h2>Выбрать свой<br /><em>способ увидеть.</em></h2>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card reveal" key={service.number} style={{ '--reveal-delay': `${index * 90}ms` }}>
              <div className="service-top"><span>{service.number}</span><i>✦</i></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul className="service-details">{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <div className="service-bottom"><span>{service.price}</span><a href="https://t.me/LubaStepAstro" target="_blank" rel="noreferrer">узнать формат <b>↗</b></a></div>
            </article>
          ))}
        </div>
        <div className="service-note">Также доступны годовой прогноз, совместимость партнёров, обучение Кундалини Рейки и сопровождение на месяц.</div>
      </section>

      <section className="site-section process-section reveal">
        <div className="section-kicker">Как это происходит</div>
        <div className="process-grid">
          <div className="reveal" style={{ '--reveal-delay': '80ms' }}><span>01</span><h3>Назвать запрос</h3><p>Без правильных формулировок. Достаточно того, что волнует вас сейчас.</p></div>
          <div className="reveal" style={{ '--reveal-delay': '170ms' }}><span>02</span><h3>Посмотреть глубже</h3><p>Мы находим связь между тем, что происходит, и тем, что удерживает движение.</p></div>
          <div className="reveal" style={{ '--reveal-delay': '260ms' }}><span>03</span><h3>Выбрать иначе</h3><p>Не из страха и долга, а из ясности, опоры и живого отклика внутри.</p></div>
        </div>
      </section>

      <section className="site-section testimonials-section reveal" id="reviews">
        <div className="section-kicker">Слова после встречи</div>
        <div className="testimonial-grid">
          {testimonials.map((quote, index) => <blockquote className="reveal" style={{ '--reveal-delay': `${index * 100}ms` }} key={index}><span>“</span><p>{quote}</p><footer>отзыв клиента</footer></blockquote>)}
        </div>
      </section>

      <section className="final-cta reveal" id="contact">
        <div className="section-kicker">Если чувствуете отклик</div>
        <h2>Там, где начинается<br /><em>ваш выбор.</em></h2>
        <p>Напишите Любови в Telegram — вместе выберете подходящий формат работы.</p>
        <div className="contact-actions"><a className="cta cta-light" href="https://t.me/LubaStepAstro" target="_blank" rel="noreferrer"><span>Написать Любе</span><b>↗</b></a><a className="contact-link" href="https://vk.ru/astrospez" target="_blank" rel="noreferrer">ВКонтакте <span>↗</span></a></div>
      </section>
    </>
  );
}

function App() {
  const heroRef = useRef(null);
  const audioRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.muted = !soundEnabled;
    audio.volume = soundEnabled ? 0.2 : 0;

    const fadeDuration = 0.9;
    const updateVolume = () => {
      if (!soundEnabled || !audio.duration) return;
      const remaining = audio.duration - audio.currentTime;
      if (remaining <= fadeDuration) {
        audio.volume = Math.max(0, 0.2 * (remaining / fadeDuration));
      } else if (audio.currentTime <= fadeDuration) {
        audio.volume = Math.min(0.2, 0.2 * (audio.currentTime / fadeDuration));
      } else {
        audio.volume = 0.2;
      }
    };
    const restart = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('timeupdate', updateVolume);
    audio.addEventListener('ended', restart);
    audio.play().catch(() => {});
    return () => {
      audio.removeEventListener('timeupdate', updateVolume);
      audio.removeEventListener('ended', restart);
    };
  }, [soundEnabled]);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((item) => observer.observe(item));

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', scrollable > 0 ? (window.scrollY / scrollable).toFixed(4) : '0');
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !next;
    audio.volume = 0;
    audio.play().catch(() => {});
  };

  const move = (event) => {
    if (reducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty('--mx', `${x * 18}px`);
    heroRef.current.style.setProperty('--my', `${y * 12}px`);
  };

  const reset = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty('--mx', '0px');
    heroRef.current.style.setProperty('--my', '0px');
  };

  return (
    <>
    <div className="scroll-progress" aria-hidden="true" />
    <main className="hero video-mode" ref={heroRef} onMouseMove={move} onMouseLeave={reset}>
      <video className="hero-video is-playing" autoPlay muted loop playsInline preload="auto" poster="./hero-concept.png" aria-hidden="true">
        <source src="./lyuba-hero-final.mp4" type="video/mp4" />
      </video>
      <div className="hero-vignette" />
      <div className="hero-noise" />
      <canvas id="three-layer" aria-hidden="true" />
      <audio ref={audioRef} src="./lyuba-ambient.m4a" autoPlay muted preload="auto" aria-hidden="true" />

      <header className="site-header">
        <div className="brand-mark">ЛЮБОВЬ <span>СТЁПИНА</span></div>
        <div className="header-actions">
          <nav className="header-nav" aria-label="Навигация по странице">
            <a href="#about">О подходе</a>
            <a href="#services">Услуги</a>
            <a href="#reviews">Отзывы</a>
          </nav>
          <button className={`sound-toggle ${soundEnabled ? 'is-on' : ''}`} type="button" onClick={toggleSound} aria-pressed={soundEnabled}>
            <span className="sound-icon">{soundEnabled ? '◉' : '◌'}</span>
            <span>{soundEnabled ? 'ЗВУК ВКЛ' : 'ЗВУК ВЫКЛ'}</span>
          </button>
          <a className="header-link" href="https://t.me/LubaStepAstro" target="_blank" rel="noreferrer">Написать Любе <span>↗</span></a>
        </div>
      </header>

      <section className="hero-copy">
        <p className="eyebrow"><span /> ведическая астрология · регрессия · расстановки</p>
        <h1>Там, где<br /><em>начинается</em><br />выбор</h1>
        <p className="lede">Увидеть, что удерживает.<br />Услышать себя. Вернуть движение.</p>
        <a className="cta" href="https://t.me/LubaStepAstro" target="_blank" rel="noreferrer">
          <span>Написать Любе</span><b>↗</b>
        </a>
      </section>

      <div className="scroll-cue"><span>листать</span><i /></div>
      <div className="field-caption">пространство для внутренней ясности <span>✦</span></div>
    </main>
    <LandingSections />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
window.dispatchEvent(new Event('hero-ready'));
