// Basic interactivity for Mustee portfolio
document.addEventListener('DOMContentLoaded', () => {
  // Preloader hide
  const pre = document.getElementById('preloader');
  setTimeout(()=>{ pre.style.display='none' }, 900);

  // Theme toggle (simple light switch)
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light-mode');
  });

  // Typewriter effect
  const typeEl = document.querySelector('.typewriter');
  const phrases = [
    "I teach students to code and build real projects.",
    "We host classes, workshops, and open-source projects.",
    "Join Mustee Tech Global and start building today."
  ];
  let idx=0, char=0, forward=true;
  function tick(){
    const text = phrases[idx];
    if(forward){
      char++;
      if(char>text.length){ forward=false; setTimeout(tick,1200); return; }
    } else {
      char--;
      if(char===0){ forward=true; idx=(idx+1)%phrases.length; }
    }
    typeEl.textContent = text.slice(0,char);
    setTimeout(tick,80);
  }
  tick();

  // Contact form validation + fake send
  const form = document.getElementById('contactForm');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name||!email||!message){ alert('Please fill all fields'); return; }
    // Here you'd send to server - for now show success
    alert('Message sent! Thank you, '+name);
    form.reset();
  });

  // Back to top
  const back = document.getElementById('backTop');
  back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.bar > div');
  function animateSkills(){
    skillBars.forEach(b=>{
      const w = b.style.width;
      b.style.width='0%';
      setTimeout(()=> b.style.width = w, 300);
    });
  }
  // trigger once when skills in view
  const skillsSection = document.querySelector('#skills');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting) animateSkills(); })
  },{threshold:0.4});
  obs.observe(skillsSection);
});
