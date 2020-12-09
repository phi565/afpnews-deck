<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a
        class="navbar-item"
        href="#"
      >
        <img
          alt="AFP Stories"
          src="@/assets/img/afp_logo.png"
        >
      </a>

      <a
        role="button"
        :class="{
          'is-active': showMobileMenu
        }"
        class="navbar-burger burger"
        @click="showMobileMenu = !showMobileMenu"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      :class="{
        'is-active': showMobileMenu
      }"
      class="navbar-menu"
    >
      <div
        class="navbar-end"
      >
        <router-link
          key="about"
          :to="{ name: 'about' }"
          class="navbar-item"
          name="about"
          aria-label="about"
        >
          <svg viewBox="0 0 300 300">
            <path d="M150,30.769A119.231,119.231,0,1,0,269.231,150,119.232,119.232,0,0,0,150,30.769Zm0,215.462A96.231,96.231,0,1,1,246.231,150,96.34,96.34,0,0,1,150,246.231Z" />
            <rect
              x="138.488"
              y="192.393"
              width="23"
              height="22.992"
            />
            <path d="M150,76.962c-25.329,0-42.347,15.41-42.347,38.346h23c0-12.684,10.521-15.346,19.347-15.346,9.343,0,19.347,5.9,19.347,14.692,0,10.511-4.035,13.623-11.359,19.275-8.238,6.354-19.519,15.058-19.519,35.3h23c0-8.938,3.532-11.663,10.568-17.091,8.571-6.613,20.31-15.669,20.31-37.485C192.347,93.871,173.35,76.962,150,76.962Z" />
          </svg>
          {{ $t("about.name") }}
        </router-link>

        <a
          class="navbar-item"
          aria-label="Log out"
          @click.prevent="logoutHandler"
        >
          <svg viewBox="0 0 500 500">
            <polygon points="313.72 345.03 388.74 265.92 167.23 265.92 167.23 233.21 388.5 233.21 313.72 154.82 313.72 108.06 451 249.71 313.72 391.37 313.72 345.03" />
            <polygon points="282.81 450.95 57.24 450.95 57.24 48.48 282.81 48.48 282.81 86.38 95.14 86.38 95.14 413.05 282.81 413.05 282.81 450.95" />
          </svg>
          {{ $t("auth.logout") }}
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            {{ locale | capitalize }}
          </a>

          <div class="navbar-dropdown is-right">
            <a
              :class="{
                'is-language': locale == 'fr',
              }"
              class="navbar-item"
              @click="changeLocale('fr')"
            >
              FR
            </a>
            <a
              :class="{
                'is-language': locale == 'en',
              }"
              class="navbar-item"
              @click="changeLocale('en')"
            >
              EN
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  },
  data () {
    return{
      showMobileMenu: false
    }
  },
  computed: {
    ...mapState([
      'locale'
    ]),
    ...mapGetters([
      'isAuthenticated'
    ])
  },
  methods: {
    ...mapActions([
      'changeLocale',
      'logout'
    ]),
    logoutHandler () {
      this.$toasted.show(this.$t('auth.not-authenticated.toast').toString(), {
        position: 'bottom-center',
        duration: 1500,
        type: 'info'
      })
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

@import "bulma/sass/utilities/initial-variables";
@import "bulma/sass/utilities/functions";

$primary: $secondary-color;

@import "bulma/sass/utilities/derived-variables";
@import "bulma/sass/utilities/mixins";

$navbar-height : 5.4rem;
$navbar-background-color: $secondary-color;
$navbar-item-color: $light;
$navbar-item-hover-color: $light;
$navbar-item-hover-background-color: $primary-color;
$navbar-item-active-color: $primary-color;
$navbar-item-active-background-color: $primary-color;
$navbar-dropdown-background-color: $primary-color;
$navbar-dropdown-border-top: 2px solid $primary-color;
$navbar-dropdown-arrow: $light;
$navbar-dropdown-item-hover-color: $light;
$navbar-dropdown-item-hover-background-color: $dark;
$navbar-breakpoint: 640px;

@import "bulma/sass/components/navbar";

.navbar {
  .navbar-brand {
    padding-left: 20px;
    @media print {
      display: flex;
      justify-content: center;
      align-items: center;
      a.navbar-item {
        line-height: normal;
      }
    }
  }

  .burger {
    @media print {
      display: none;
    }
  }

  .navbar-menu {
    @media print {
      display: none;
    }
    @include breakpoint(mobile) {
      padding: 0px;
    }

    .navbar-end {
      background: $dark;

      @include breakpoint(mobile) {
        background-color: $secondary-color;

        > a.navbar-item:hover, > a.navbar-item.is-active, > a.navbar-item:focus-within {
          background-color: rgba($dark, 0.05);
        }
      }
      .navbar-item {
        text-transform: uppercase;
        text-decoration: none;
        padding: 0.5rem 1.75rem;

        svg {
          fill: $light;
          height: 24px;
          margin-right: 5px;
        }

        @include breakpoint(mobile) {
          padding-top: 1rem;
          padding-bottom: 1rem;
          color: $light;
          svg {
            transform: translateY(5px);
          }
        }

        &.has-dropdown.is-hoverable {
            &:hover {
              background: $primary-color;
            }
            .is-language{
              text-decoration: underline !important;
              font-weight: 800;
            }
            &::before {
              content: '';
              position: absolute;
              width: 1px;
              height: 50%;
              background: $white;
              top: 50%;
              left: 0;
              transform: translateY(-50%);

              @include breakpoint(mobile) {
                display: none;
              }
            }

            @include breakpoint(mobile) {
              padding: 0;
              .navbar-link {
                display: none;
              }
              .navbar-dropdown {
                display: flex;
                background: $dark;
                .navbar-item {
                  &:hover {
                    background: rgba($light, 0.05);
                  }
                }
              }
            }
        }
      }
    }
  }
}
</style>