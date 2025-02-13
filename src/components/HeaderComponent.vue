<template>
  <header>
    <nav class="nav">
      <h1>MY TRAVELS</h1>
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/travels">Travels</RouterLink>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  background-color: rgba(21, 144, 201, 0.323);
}
.nav {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid white;
  gap: 2px;
}
.link {
  color: white;
  text-decoration: none;
  width: 50%;
  height: fit-content;
  padding: 0.6rem;
  border-radius: 25px;
}
.link:hover {
  background-color: white;
  color: black;
  transition: 0.5s ease;
}
a {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.8s ease;
}
h1{
    font-size: 2em;
    font-weight: bold;
    letter-spacing: 0.1em;
}
@media(max-width:600px){
    a.link{
        padding: 0.2rem 1.5rem;
        width: 60%;
    }
}
@media(max-width:600px){
  .nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows:2fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid white;
  gap: 2px;
}
h1{
  grid-row: 1 ;
  grid-column: 1 / -1;
}
.link {
  margin-bottom: 0.4rem;
}
}
</style>
