# expense_tracker

## Deploy the vue project to github pages

Step 1 : 
Create the branch Ex: gh-pages

Step 2 : 
In the vue.config.js file adde the code 

``
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/REPO_NAME/'
    : '/'
}

``

Step 3:
If there is a ``.gitignore`` file remove the ``/dist``

Step 4: 
Commit the local changes 

Step 4:
Push the dist changes to the branch
``git subtree push --prefix dist origin gh-pages``
