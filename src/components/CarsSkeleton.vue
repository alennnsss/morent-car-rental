<template>
  <div class="skeleton-card">
    <div class="skeleton-title pulse">

    </div>
    <div class="skeleton-type pulse">

    </div>
    <div class="skeleton-image pulse"></div>
    <div class="skeleton-desc pulse"></div>
    <div class="skeleton-rental">
        <div class="skeleton-price pulse"></div>
        <div class="skeleton-button pulse"></div>
    </div>    
  </div>
</template>

<style>
    .skeleton-card {
      height: 388px;
      width: 100%;
      padding: 24px;
      background-color: #FFFFFF;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .skeleton-title {
      width: 20%;
      height: 20px;
      border-radius: 20px;
    }
    .skeleton-type {
      width: 10%;
      height: 20px;
    }
    .skeleton-image {
      width: 100%;
      height: 40%;
    }
    .skeleton-desc {
      width: 100%;
      height: 25px;
    }
    .skeleton-rental {
      width: 100%;
      height: 44px;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    .skeleton-price {
      width: 40%;
      height: 30px;
    }
    .skeleton-button {
      width: 40%;
      height: 44px;
    }
    .pulse {
      background: linear-gradient(90deg, #EEF1F6 0%, #DCE3EE 50%, #EEF1F6 100%);
      background-size: 200% 100%;
      animation: pulse-animation 1.5s infinite;
      border-radius: 4px;
    }
    @keyframes pulse-animation {
      0% {
        background-position: 200% 0;
      }
      100% {    
        background-position: -200% 0;
      }
    }
</style>
<script>

</script>

