# BorrowMe

## Table of Contents
* [About the App](#about-the-app)
* [Technologies](#technologies)
* [Setup](#setup)
* [Story](#story)
* [Team](#team)


## About the App
BorrowMe is a website where users can borrow items from each other. Users can post announcements containing information about the item they want to lend. Other users can then reserve the item for specific days. The website allows users to comunicate through a live chat with each other.

## Technologies
This projects backend is build with:
* ASP.NET Core 6.0
* Microsoft SQL Server 2019
* Microsoft Entity Framework Core 6.0.3
* ASP.NET Core Identity
* ASP.NET Core SignalR

This projects frontend is build with:
* React.JS 17.0.2
* Redux 4.1.2
* Material UI 5.4.0
* Bootstrap 5.1.3

## Setup
1. Set multiple startup projects
- Open BorrowMeAPI/BorrowMeBackEnd.sln in Visual Studio Community
- Right click on solution and choose "Set startup project"
- Check Multiple startup projects and set "Api" and "AuthenticationApi" action to "start" then apply
2. Set connection strings in user secrets
- Right click on "Api" and select "Manage User Secrets" then paste this in secrets.json:
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=<YourServerName>;Database=borrow_me;Trusted_Connection=True;"
  }
}
```
- Do the same thing with "AuthenticationApi" but paste this:
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=<YourServerName>;Database=borrow_me;Trusted_Connection=True;",
    "BorrowMeAuthContextConnection": "Server=<YourServerName>;Database=BorrowMeAuth;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```
- Don't forget to inculde your server name
3. Generate databases
- open Package Manager Console and make sure "Default project" is set to "Api"
- type "update-database"
- change "Default project" to "AuthenticationApi"
- type "update-database -Context BorrowMeAuthContext"
4. Fill databases with data
- execute query from Data Queries/insertQueries.txt
5. Install React dependencies
- open BorrowMeReact directory in Visual Studio Code 
- in terminal type "npm install"
6. All set up! You can now run the app
- Run the server in Visual Studio Community
- Run react app by typing "npm start" in VS code

## Story
Let's assume that you have just bought an apartament at a bargain price. It was cheaper for one, simple reason - it is whole for renovation. You still want to save as much money as possible, so you ask your handyman uncle to help. He readily agrees, but there's one problem. He doesn't have any tools. So, where to get them? You're not going to buy it, duuuuh...
What if you borrowed them?

## Team
Our developers:
* [Dominik Berniak](https://github.com/DominikBerniak)
* [Pola Jędrecka](https://github.com/PolaJedrecka)
* [Paweł Kamiński](https://github.com/Pawel-Kaminski404)
