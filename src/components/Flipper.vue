<template>
  <div class="flipper">
    <div class="front">
      <slot name="flipper-front"></slot>
    </div>
    <div class="back">
      <slot name="flipper-back"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
  .front,
  .back {
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    transition: 0.6s;
    transform-style: preserve-3d;
    position: absolute;
    top: 0;
    left: 0;
  }
  .front {
    z-index: 2;
    transform: rotateY(0deg);
  }
  .back {
    transform: rotateY(180deg);
  }
}
</style>
