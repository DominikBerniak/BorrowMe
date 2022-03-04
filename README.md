


# BorrowMe

## Setup
- Set multiple startup projects
-- Open BorrowMeAPI/BorrowMeBackEnd.sln in Visual Studio Community
-- Right click on solution and choose "Set startup project"
-- Check Multiple startup projects and set "Api" and "AuthenticationApi" action to "start" then apply
- Set connection strings in user secrets
-- Right click on "Api" and select "Manage User Secrets" then paste this in secrets.json:
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=<YourServerName>;Database=borrow_me;Trusted_Connection=True;"
  }
}
-- Do the same thing with "AuthenticationApi" but paste this:
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=<YourServerName>;Database=borrow_me;Trusted_Connection=True;",
    "BorrowMeAuthContextConnection": "Server=<YourServerName>;Database=BorrowMeAuth;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}

*Don't forget to inculde your server name
- Generate databases
-- open Package Manager Console and make sure "Default project" is set to "Api"
-- type "update-database"
-- change "Default project" to "AuthenticationApi"
-- type "update-database -Context BorrowMeAuthContext"
- Fill databases with data
-- execute query from Data Queries/insertQueries.txt
- Install React dependencies
-- open BorrowMeReact directory in Visual Studio Code 
-- in terminal type "npm install"
- All set up! You can now run the app
-- Run the server in Visual Studio Community
-- Run react app by typing "npm start" in VS code






- npm install


## Story
Let's assume that you have just bought an apartament at a bargain price. It was cheaper for one, simple reason - it is whole for renovation. You still want to save as much money as possible, so you ask your handyman uncle to help. He readily agrees, but there's one problem. He doesn't have any tools. So, where to get them? You're not going to buy it, duuuuh...
What if you borrowed them?
