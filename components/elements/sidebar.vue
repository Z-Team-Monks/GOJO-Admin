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
                src="../../assets/images/home.png"
                width="30"
                height="30"
                alt=""
              />
            </a>
          </li>
          </nuxt-link>
          <li>
            <a class="s-sidebar__nav-link" href="#0">
              <img
                src="../../assets/images/user.png"
                width="30"
                height="30"
                alt=""
              />
            </a>
          </li>
          <li>
            <a class="s-sidebar__nav-link" href="#0">
              <img
                src="../../assets/images/settings.png"
                width="30"
                height="30"
                alt=""
              />
            </a>
          </li>
          <nuxt-link to="/dashboard/transaction">
            <li>
            <a class="s-sidebar__nav-link" href="#0">
              <img
                src="https://static.vecteezy.com/system/resources/previews/017/197/461/large_2x/green-check-mark-icon-on-transparent-background-free-png.png"
                width="30"
                height="30"
                alt=""
              />
            </a>
          </li>
          </nuxt-link>
        </ul>
      </nav>
    </div>
</template>