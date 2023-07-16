# Event Tracker

Our first Group Scratch Project

---

Git Reference tips:

## To grab all branches

git fetch --all

## Step 1: clone down repo onto your personal computer

git clone [project GitHub url]

## Step 2: Creating a new branch

### Make this branch off of 'dev' branch. Make sure you are currently in dev branch!

git checkout dev
git checkout -b [new branch name]

## Step 3: Commit changes to current branch

git commit -m "your commit message"

## Step 4: Merge updates from 'dev' branch

git chechout dev
git pull origin dev
git checkout [branch name]
git merge dev

## Step 5: Push updates to online Repo

git push origin [branch name]

## Step 6: Submit Pull Request

Do this online inside the GitHub Repo!

## Straight from Jordan's slides

when you want to push up, these are the steps:

1. git checkout dev (locally switch to dev branch)
2. git pull origin dev (pull updates of dev down to your local system)
3. git checkout <your branch> (switch back to your branch locally)
4. git merge dev (brings dev into your branch locally)
5. Resolve conflicts or :q if there aren’t any
6. git push origin <your branch> (push merged branch up to github)
7. Create a pull request in github from <your branch> ==> dev
8. Repeat as needed
9. When you are ready to publish to main, do step 7 but from dev => main
