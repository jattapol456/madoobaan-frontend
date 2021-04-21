<template lang="pug">
  footer
    .footer-bar
      .block-content
        p 2021 Madoobaan

        .icons.ml-auto
          a.icon
            ion-icon(name="logo-twitter")
          a.icon
            ion-icon(name="logo-facebook")
</template>

<style lang="scss" scoped>
footer {
  @apply w-full bg-black-700 text-white;

  .quick-journey-panel,
  .footer-bar {
    @apply flex flex-col items-center w-full px-16;

    .block-content {
      @apply flex w-full max-w-7xl font-noto;
    }
  }

  .quick-journey-panel {
    @apply py-12;

    .block-content {
      @apply grid grid-cols-3 gap-x-6;

      .block {
        > * {
          max-width: 80%;
        }

        img.logo-jobbee {
          width: 100%;
          max-width: 134px;
        }
      }
    }
  }

  .footer-bar {
    @apply justify-center bg-black-800;

    height: 4.5rem;

    .block-content {
      @apply items-center;

      .icons {
        display: flex;
        column-gap: 1rem;

        .icon {
          @apply flex square-8 text-8;
        }
      }
    }
  }
}
</style>
