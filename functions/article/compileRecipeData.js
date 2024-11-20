import { Parser } from 'htmlparser2';

const compileRecipeData = (html) => {
  const recipes = [];
  html.filter((el) => el?.type === 'raw_html');
  html.forEach((el) => {
    const parser = new Parser({
      onopentag: (tag, attributes) => {
        const { class: className } = attributes || {};
        const isRecipe = className === 'recipe_container';
        if (isRecipe) recipes.push(el);
      },
    });

    parser.write(el.content);
    parser.end();
  });
  return recipes.length ? recipes : null;
};

export default compileRecipeData;
