<template>
    <div class="s-layout__sidebar">
      <a class="s-sidebar__trigger" href="#0">
        <i class="fa fa-bars"></i>
      </a>

      <nav class="s-sidebar__nav mt-5">
        <ul>
          <nuxt-link to="/dashboard/home">
            <li>
            <a class="s-sidebar__nav-link" href="#0">
              <img
                src="../../assets/images/Frame.svg"
                width="30"
                height="30"
                class="sidebar-img"
                alt=""
              />
            </a>
          </li>
          </nuxt-link>
          <nuxt-link to="/dashboard/properties">
            <li>
            <a class="s-sidebar__nav-link" href="#0">
              <img
                src="../../assets/images/Vector.svg"
                width="30"
                height="30"
                class="sidebar-img"
                alt=""
              />
            </a>
          </li>
          </nuxt-link>
          <nuxt-link to="/dashboard/profile">
          <li>
            <a class="s-sidebar__nav-link" href="#0">
              <img
                src="../../assets/images/Vector (1).svg"
                width="30"
                height="30"
                class="sidebar-img"
                alt=""
              />
            </a>
          </li>
          </nuxt-link>
          <nuxt-link to="/dashboard/transaction">
            <li>
            <a class="s-sidebar__nav-link" href="#0">
              <img
                src="https://static.vecteezy.com/system/resources/previews/017/197/461/large_2x/green-check-mark-icon-on-transparent-background-free-png.png"
                width="30"
                height="30"
                class="sidebar-img"
                alt=""
              />
            </a>
          </li>
          </nuxt-link>
        </ul>
      </nav>
    </div>
</template>