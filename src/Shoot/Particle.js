// particle.js

// Particle Class
class Particle {
  constructor(x, y, color, velocity, size, life) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.size = size;
    this.life = life;
    this.maxLife = life;
    this.alpha = 1;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life--;
    this.alpha = this.life / this.maxLife;
    return this.life <= 0;
  }
}

// Particle System Class
class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  // Explosion effect
  createExplosion(x, y, color, count = 20) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      const size = Math.random() * 3 + 1;
      const life = Math.random() * 30 + 20;

      this.particles.push(new Particle(x, y, color, velocity, size, life));
    }
  }

  // Trail effect (for bullets, ships, etc.)
  createTrail(x, y, color) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.5;
    const velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
    const size = Math.random() * 2 + 1;
    const life = Math.random() * 20 + 10;

    this.particles.push(new Particle(x, y, color, velocity, size, life));
  }

  // Update all particles
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].update()) {
        this.particles.splice(i, 1);
      }
    }
  }

  // Draw all particles
  draw(ctx) {
    this.particles.forEach((particle) => particle.draw(ctx));
  }
}

// Export instance
export const particleSystem = new ParticleSystem();
