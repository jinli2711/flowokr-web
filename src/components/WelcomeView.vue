<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()
const isMobile = ref(false)

const checkDeviceType = () => {
  isMobile.value = window.innerWidth <= 768
}

const particlesOptions = {
  background: {
    color: { value: '#020617' },
  },
  fpsLimit: isMobile.value ? 60 : 120,
  interactivity: {
    events: {
      onHover: {
        enable: !isMobile.value,
        mode: 'connect',
      },
    },
    modes: {
      connect: {
        distance: isMobile.value ? 150 : 250,
        links: { opacity: isMobile.value ? 0.5 : 0.8 },
        radius: isMobile.value ? 120 : 180,
      },
      grab: { distance: isMobile.value ? 150 : 200 },
    },
  },
  particles: {
    color: {
      value: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'],
      animation: {
        enable: true,
        speed: 5,
        sync: false,
      },
    },
    links: {
      color: 'random',
      distance: isMobile.value ? 100 : 150,
      enable: true,
      opacity: 0.1,
      width: 1,
      triangles: { enable: true, opacity: 0.05 },
    },
    move: {
      enable: true,
      speed: { min: isMobile.value ? 0.5 : 1, max: isMobile.value ? 1.5 : 2 },
      direction: 'none',
      outModes: { default: 'out' },
      attract: {
        enable: true,
        rotate: {
          x: isMobile.value ? 1000 : 600,
          y: isMobile.value ? 2000 : 1200,
        },
      },
      spin: {
        enable: true,
        acceleration: 0.1,
      },
    },
    number: {
      density: {
        enable: true,
        area: 1000,
      },
      value: isMobile.value ? 70 : 120,
    },
    opacity: {
      value: { min: 0.3, max: 0.7 },
      animation: { enable: true, speed: 1, sync: false },
    },
    size: {
      value: { min: isMobile.value ? 0.5 : 1, max: isMobile.value ? 3 : 4 },
      animation: { enable: true, speed: 3, sync: false },
    },
  },
  mouse: {
    enable: !isMobile.value,
  },
}

onMounted(() => {
  checkDeviceType()
  window.addEventListener('resize', checkDeviceType)

  const tl = gsap.timeline()
  tl.from('.welcome-title', {
    duration: 2,
    y: 120,
    opacity: 0,
    ease: 'expo.out',
    filter: 'blur(10px)',
  })
    .from(
      '.welcome-sub',
      {
        duration: 1.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
      },
      '-=1.2',
    )
    // 使用 fromTo 确保起始和结束状态明确，防止按钮消失
    .fromTo(
      '.action-btn',
      {
        scale: 0.5,
        opacity: 0, // 起始状态：透明
      },
      {
        duration: 1.2,
        scale: 1,
        opacity: 1, // 结束状态：完全可见
        ease: 'back.out(1.7)',
      },
      '-=1',
    )

  onUnmounted(() => {
    window.removeEventListener('resize', checkDeviceType)
  })
})
</script>

<template>
  <div class="welcome-container">
    <vue-particles id="tsparticles" :options="particlesOptions" />

    <div class="main-content">
      <h1 class="welcome-title">FlowOKR</h1>
      <p class="welcome-sub">任务驱动的智能协作与OKR系统</p>
      <div class="action-buttons">
        <button @click="router.push('/')" class="cyber-button action-btn">
          <span class="btn-content">开始体验</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  /* 使用 fixed 定位脱离父级 padding，修复视觉偏右问题 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  
  background: #020617;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 999;
}

#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.main-content {
  z-index: 10;
  pointer-events: none;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome-title {
  font-size: clamp(2rem, 12vw, 7rem);
  font-weight: 900;
  letter-spacing: clamp(4px, 2vw, 12px);
  /* 使用 text-indent 平衡 letter-spacing 带来的视觉偏差 */
  text-indent: clamp(4px, 2vw, 12px);
  
  background: linear-gradient(to bottom, #fff 50%, #64748b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 clamp(8px, 3vw, 15px) rgba(59, 130, 246, 0.4));
  margin: 0;
  line-height: 1.1;
  text-align: center;
}

.welcome-sub {
  font-size: clamp(0.9rem, 4vw, 1.1rem);
  color: #fff;
  letter-spacing: clamp(4px, 3vw, 15px);
  text-indent: clamp(4px, 3vw, 15px);
  margin-top: clamp(10px, 2vh, 15px);
  font-weight: 300;
  opacity: 0.8;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.action-buttons {
  margin-top: 60px;
  pointer-events: auto; /* 确保按钮区域可点击 */
  display: flex;
  justify-content: center;
  width: 100%;
  /* 确保按钮容器有足够的高度 */
  min-height: 60px; 
}

/* 还原 WelcomeView_prev.vue 的按钮样式 */
.cyber-button {
  position: relative;
  padding: 18px 50px;
  background: rgba(59, 130, 246, 0.1); /* 极低不透明度背景 */
  backdrop-filter: blur(5px);
  border: 1px solid rgba(59, 130, 246, 0.5);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 4px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  border-radius: 4px; /* 还原为小圆角 */
  /* 确保 CSS 层面也是可见的 */
  opacity: 1; 
}

.cyber-button:hover {
  background: #3b82f6;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  transform: translateY(-3px);
  border-color: #3b82f6;
}

.btn-content {
  position: relative;
  z-index: 2;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .welcome-title {
    text-indent: clamp(4px, 2vw, 6px);
  }
  
  .welcome-sub {
    max-width: 90%;
  }
  
  .action-buttons {
    margin-top: clamp(20px, 6vh, 30px);
  }
  
  .cyber-button {
    padding: 12px 30px;
    font-size: 1rem;
  }
}
</style>