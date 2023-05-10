<script lang="ts"></script>

<div class="cubrir">
  <form class="create">
    <h1 class="font-bold text-3xl">Create article</h1>
    <div class="carta">
      <p>Title</p>
      <input
        class="capitalize"
        type="text"
        placeholder="Title of the article"
        maxlength="20"
        required
      />
    </div>
    <div class="carta">
      <p>Topic</p>
      <input
        placeholder="Short topic"
        type="text"
        class="capitalize"
        maxlength="12"
        required
      />
    </div>
    <div class="carta">
      <p>Preview</p>
      <input
        class="capitalize"
        type="text"
        placeholder="Short preview of the article"
        maxlength="50"
        required
      />
    </div>
    <div class="carta">
      <p>Imgage of the article</p>
      <input type="text" placeholder="url of the img" />
    </div>
    <div class="carta">
      <p>Description</p>
      <textarea
        class="capitalize"
        name="desc"
        id=""
        cols="10"
        rows="8"
        placeholder="Full description of the article"
        required
      />
    </div>
    <div class="carta">
      <p>Full article</p>
      <textarea name="text" id="a" cols="30" rows="15" />
    </div>

    <div class="but"><button>Submit</button></div>
    <div class="space h-24" />
  </form>
</div>

<style>
  form {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    width: 800px;
  }
  .carta {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  #a {
    text-indent: 0px;
  }
  input {
    width: 100%;
  }
  .but {
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
  }
  .but > button {
    width: 100px;
  }
  .cubrir {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
  }
</style>
