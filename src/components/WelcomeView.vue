<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()

// 核心配置：流光粒子 + 鼠标旋转交互
const particlesOptions = {
  background: {
    color: { value: '#020617' }, // 深邃星空底色
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'connect', // 悬停时增强连接感
      },
    },
    modes: {
      // 鼠标旋转交互的关键配置
      connect: {
        distance: 250,
        links: { opacity: 0.8 },
        radius: 180,
      },
      grab: { distance: 200 },
    },
  },
  particles: {
    // 1. 流光颜色配置
    color: {
      value: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'], // 多色流光
      animation: {
        enable: true,
        speed: 5,
        sync: false,
      },
    },
    links: {
      color: 'random',
      distance: 150,
      enable: true,
      opacity: 0.1, // 让背景变暗
      width: 1,
      triangles: { enable: true, opacity: 0.05 }, // 增加三角形网格感
    },
    move: {
      enable: true,
      speed: { min: 1, max: 2 }, // 基础游走速度：数值越大，粒子整体飞行越快
      direction: 'none',
      outModes: { default: 'out' },
      // 2. 增加“跟随鼠标旋转”效果的核心参数
      attract: {
        enable: true,
        rotate: {
          // 数值越小，旋转拉力越强（粒子会更紧凑地绕着鼠标转）
          // 建议范围：x 轴 600-3000, y 轴 1200-3000
          x: 600,
          y: 1200,
        },
      },
      spin: {
        enable: true, // 开启粒子自旋
        acceleration: 0.1, // 旋转加速度：数值越大，旋转时的“甩动”感越明显，可以试着修改为0.2，0.5
      },
    },
    number: {
      density: {
        enable: true,
        area: 1000, // 建议保持在 800-1000，这代表每 800 像素区域内的粒子基数
      },
      value: 100, // 粒子密度：如果觉得太稀疏可以改为 150-200，觉得太乱可以降到 50-80
    },
    opacity: {
      value: { min: 0.3, max: 0.7 },
      animation: { enable: true, speed: 1, sync: false },
    },
    size: {
      value: { min: 1, max: 4 },
      animation: { enable: true, speed: 3, sync: false },
    },
  },
  // 3. 启用鼠标跟随偏移
  mouse: {
    enable: true,
  },
}

onMounted(() => {
  // GSAP 进场动画
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
    .from(
      '.action-btn',
      {
        duration: 1.2,
        scale: 0.5,
        opacity: 0,
        ease: 'back.out(1.7)',
      },
      '-=1',
    )
})
</script>

<template>
  <div class="welcome-container">
    <vue-particles id="tsparticles" :options="particlesOptions" />

    <div class="main-content">
      <h1 class="welcome-title">FlowOKR</h1>
      <p class="welcome-sub">任务驱动的智能协作与OKR系统</p>
      <div class="action-buttons">
        <button @click="router.push('/')" class="cyber-button">
          <span class="btn-content">开始体验</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  height: 100vh;
  width: 100vw;
  background: #020617;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.main-content {
  z-index: 10;
  pointer-events: none; /* 让鼠标事件穿透到粒子层，除非点击按钮 */
  text-align: center;
}

.glass-card {
  padding: 60px 100px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.welcome-title {
  font-size: 7rem; /* 稍微放大，增强视觉冲击力 */
  font-weight: 900;
  letter-spacing: 12px;
  background: linear-gradient(to bottom, #fff 50%, #64748b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* 增加外发光，防止被背景粒子干扰 */
  filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.4));
  margin: 0;
}

.welcome-sub {
  font-size: 1.1rem;
  color: #fff;
  letter-spacing: 15px;
  margin-top: 15px;
  font-weight: 300;
  opacity: 0.8;
  /* 文字阴影确保在复杂粒子背景下依然清晰 */
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

.action-buttons {
  margin-top: 60px;
  pointer-events: auto; /* 恢复按钮的点击 */
  display: flex;
  gap: 20px;
  justify-content: center;
}

/* 赛博风格按钮 */
.cyber-button {
  position: relative;
  padding: 18px 50px;
  background: rgba(59, 130, 246, 0.1); /* 极低不透明度背景 */
  backdrop-filter: blur(5px); /* 轻微模糊 */
  border: 1px solid rgba(59, 130, 246, 0.5);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 4px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  border-radius: 4px;
}

.cyber-button:hover {
  background: #3b82f6;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  transform: translateY(-3px);
}

.cyber-button.secondary {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.5);
}

.cyber-button.secondary:hover {
  background: #8b5cf6;
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
}

.btn-content {
  position: relative;
  z-index: 2;
}
</style>
