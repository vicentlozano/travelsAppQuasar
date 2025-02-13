<template>
  <footer>
    <div id="footer">
      <h3>Vilodev@Copyright</h3>

      <div class="icons">
        <a href="https://github.com/vicentlozano">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg"
            alt="GitHub"
            width="32"
            height="32"
        /></a>
        <a href="mailto:lozanodroid@gmail.com">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/gmail.svg"
            alt="Gmail"
            width="32"
            height="32"
        /></a>
        <a href="https://www.instagram.com/vicentlozano94">
          <img
            src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/instagram.svg"
            alt="Instagram"
            width="32"
            height="32"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
footer {
  display: inline;
  border-top: 2px solid white;
  background-color: rgba(21, 144, 201, 0.323);
}

#footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2em;
  height: 100%;
  justify-content: space-evenly;
  gap: 10rem;
  width: 100%;
}
.icons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
}
a {
  display: flex;
  justify-content: center;
  align-items: center;
}
h3 {
  font-size: larger;
  padding: 0.3rem;
  margin: 0;
}
@media (max-width: 600px) {
  #footer {
    gap: 1rem;
  }
  .icons img {
    width: 26px;
    height: 26px;
  }
  h3 {
    font-size: medium;
  }
}
</style>
