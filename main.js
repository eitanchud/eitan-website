(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const journey = document.querySelector(".journey");
  const items = [...document.querySelectorAll(".journey__item")];
  const fill = document.querySelector(".journey__fill");
  const rail = document.querySelector(".journey__rail");
  const track = document.querySelector(".journey__track");
  const counter = document.querySelector(".journey__counter-now");
  const total = document.querySelector(".journey__counter-total");

  if (!journey || !items.length || !fill || !rail || !track) return;

  const pad = (n) => String(n).padStart(2, "0");
  if (total) total.textContent = `/ ${pad(items.length)}`;

  const dotOffset = () => {
    const style = getComputedStyle(items[0], "::before");
    return parseFloat(style.top) || 0;
  };

  const dotY = (item, offset) => item.getBoundingClientRect().top + offset;

  const placeRail = (offset) => {
    const trackTop = track.getBoundingClientRect().top;
    const start = dotY(items[0], offset);
    const end = dotY(items[items.length - 1], offset);
    rail.style.top = `${start - trackTop}px`;
    rail.style.height = `${Math.max(end - start, 0)}px`;
    return { start, end };
  };

  const mark = (current) => {
    items.forEach((item, index) => {
      item.classList.toggle("is-current", index === current);
      item.classList.toggle("is-done", index < current);
    });
    if (counter) counter.textContent = pad(Math.max(current, 0) + 1);
  };

  if (reduce) {
    placeRail(dotOffset());
    fill.style.height = "100%";
    mark(items.length - 1);
    return;
  }

  let ticking = false;

  const update = () => {
    ticking = false;
    const offset = dotOffset();
    const { start, end } = placeRail(offset);
    const line = window.innerHeight * 0.5;
    const progress = Math.min(1, Math.max(0, (line - start) / Math.max(end - start, 1)));
    fill.style.height = `${progress * 100}%`;

    let current = 0;
    items.forEach((item, index) => {
      if (dotY(item, offset) <= line) current = index;
    });
    mark(current);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  document.fonts?.ready.then(update);
})();
