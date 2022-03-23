

function CreateRecipe() {
  return ( 
      <form action="http://localhost:3001/recipes" method="post">
        <input type="text" name="title" id="" />
        <input type="text" name="image" id="" />
        <textarea name="summary"></textarea>
        <textarea name="steps"></textarea>
        <input type="number" name="score" id="" />
        <input type="number" name="healdScore" id="" />
      </form>
   );
}

export default CreateRecipe;