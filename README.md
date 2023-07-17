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

## Connors Git Wisdom
git fetch —all
git fetch —all -v
git branch -a
git fetch —all —prune -v

# git 
    Git add/commit
    git push origin halia-frontEnd

    Go make pull request from halia-frontEnd to dev

    git checkout dev
    git pull origin dev
    git checkout halia-frontEnd
    git merge dev

# OAuth
- Request User Authorization

    - The first step is to request authorization from the user, so our app can access to the Spotify resources in behalf that user. To do so, our application must build and send a GET request to the /authorize endpoint with the following parameters:
        - client_id	(Required The Client ID generated after registering your application response_type)	(Required Set to code.)
        - redirect_uri	(Required The URI to redirect to after the user grants or denies permission. This URI needs to have been entered in the Redirect URI allowlist that you specified when you registered your application (See the app guide). The value of redirect_uri here must exactly match one of the values you entered when you registered your application, including upper or lowercase, terminating slashes, and such.)
        - state	(Optional, but strongly recommended This provides protection against attacks such as cross-site request forgery. See RFC-6749.)
        - scope	(Optional A space-separated list of scopes.If no scopes are specified, authorization will be granted only to access publicly available information: that is, only information normally visible in the Spotify desktop, web, and mobile players.)
        - show_dialog	(Optional Whether or not to force the user to approve the app again if they’ve already done so. If false (default), a user who has already approved the application may be automatically redirected to the URI specified by redirect_uri. If true, the user will not be automatically redirected and will have to approve the app again.)


- Response

    - If the user accepts your request, then the user is redirected back to the application using the redirect_uri passed on the authorized request described above.

    - The callback contains two query parameters:
        - code	(An authorization code that can be exchanged for an Access Token.)
        - state	(The value of the state parameter supplied in the request.)

    - If the user does not accept your request or if an error has occurred, the response query string contains the following parameters:
        - error	(The reason authorization failed, for example: "access_denied")
        - state	(The value of the state parameter supplied in the request.)

- Request Access Token
    - If the user accepted your request, then your app is ready to exchange the authorization code for an Access Token. It can do this by making a POST request to the /api/token endpoint.

    - The body of this POST request must contain the following parameters encoded in application/x-www-form-urlencoded: 
        - grant_type	(Required This field must contain the value "authorization_code".)
        - code	(Required The authorization code returned from the previous request.)
        - redirect_uri	(Required This parameter is used for validation only (there is no actual redirection). The value of this parameter must exactly match the value of redirect_uri supplied when requesting the authorization code.)

    - The request must include the following HTTP headers:
        - Authorization	(Required Base 64 encoded string that contains the client ID and client secret key. The field must have the format: Authorization: Basic <base64 encoded client_id:client_secret>)
        - Content-Type	(Required Set to application/x-www-form-urlencoded.)

- Response
    - On success, the response will have a 200 OK status and the following JSON data in the response body:
        - access_token	(string)	(An Access Token that can be provided in subsequent calls, for example to Spotify Web API services.)
        - token_type	(string)	(How the Access Token may be used: always "Bearer".)
        - scope	(string)	(A space-separated list of scopes which have been granted for this access_token)
        - expires_in	(int)	(The time period (in seconds) for which the Access Token is valid.)
        - refresh_token	(string)	(A token that can be sent to the Spotify Accounts service in place of an authorization code. (When the access code expires, send a POST request to the Accounts service /api/token endpoint, but use this code in place of an authorization code. A new Access Token will be returned. A new refresh token might be returned too.))

- Request a refreshed Access Token
    - In order to refresh the token, a POST request must be sent with the following body parameters encoded in application/x-www-form-urlencoded:
        - grant_type	(Required) (Set it to refresh_token.)
        - refresh_token	(Required) (The refresh token returned from the authorization code exchange.)