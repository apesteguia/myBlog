<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div class="cover">
  <form use:enhance method="POST" action="" class="login gap-10">
    <h1 class="text-left font-bold text-3xl gap-10 mt-5">Login</h1>
    <div class="card">
      <p>User</p>
      <input
        name="email"
        type="text"
        placeholder="Enter username"
        maxlength="30"
      />
    </div>
    <div class="card">
      <p>Password</p>
      <input
        name="password"
        type="password"
        placeholder="Enter password"
        maxlength="30"
      />
    </div>
    <button class="w-20">Log in</button>
  </form>
  <div class="nota">
    <h1>Only premium users can Log in</h1>
    <button>Become premium user</button>
  </div>
</div>

<style>
  .cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nota {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  form {
    border: 1px solid #353535;
    border-radius: 5px;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
    height: 400px;
  }
  p {
    margin-left: 25px;
    margin-bottom: 10px;
  }
  input {
    margin-left: 25px;
    width: 90%;
  }
</style>
