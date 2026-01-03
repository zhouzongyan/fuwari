// src/utils/banner.ts

const bannerImages = Object.keys(
  import.meta.glob('../..//public/assets/images/banner/*.{jpg,jpeg,png,webp,gif}', {
    eager: true,
  })
).map(p => p.replace('/public', '')).map(p => p.replace('../../', '/'));

if (bannerImages.length === 0) {
  throw new Error('banner 图片目录为空');
}

// 洗牌一次（构建期）
for (let i = bannerImages.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [bannerImages[i], bannerImages[j]] = [bannerImages[j], bannerImages[i]];
}

let index = 0;

export function getNextBanner() {
  const img = bannerImages[index % bannerImages.length];
  index++;
  return img;
}
