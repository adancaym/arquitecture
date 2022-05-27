# backend v0.0.0



- [Asset](#asset)
	- [Create asset](#create-asset)
	- [Delete asset](#delete-asset)
	- [Retrieve asset](#retrieve-asset)
	- [Retrieve assets](#retrieve-assets)
	- [Retrieve assets by srcCollection](#retrieve-assets-by-srccollection)
	- [Retrieve assets by id SrcCollection from-to range](#retrieve-assets-by-id-srccollection-from-to-range)
	- [Retrieve assets by id SrcCollection trait_type and value](#retrieve-assets-by-id-srccollection-trait_type-and-value)
	- [Update asset](#update-asset)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	- [Authenticate with Github](#authenticate-with-github)
	- [Authenticate with Google](#authenticate-with-google)
	
- [File](#file)
	- [Create file](#create-file)
	- [Delete file](#delete-file)
	- [Retrieve file](#retrieve-file)
	- [Retrieve files](#retrieve-files)
	- [Update file](#update-file)
	
- [Groups](#groups)
	- [Create groups](#create-groups)
	- [Delete groups](#delete-groups)
	- [Retrieve groups](#retrieve-groups)
	- [Update groups](#update-groups)
	
- [Menu](#menu)
	- [Create menu](#create-menu)
	- [Delete menu](#delete-menu)
	- [Retrieve menu](#retrieve-menu)
	- [Retrieve menus](#retrieve-menus)
	- [Update menu](#update-menu)
	
- [Message](#message)
	- [Create message](#create-message)
	- [Delete message](#delete-message)
	- [Retrieve message](#retrieve-message)
	- [Retrieve messages](#retrieve-messages)
	- [Update message](#update-message)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Process](#process)
	- [Create process](#create-process)
	- [Delete process](#delete-process)
	- [Retrieve process](#retrieve-process)
	- [Retrieve processes](#retrieve-processes)
	- [Update process](#update-process)
	
- [Provider](#provider)
	- [Create provider](#create-provider)
	- [Delete provider](#delete-provider)
	- [Retrieve provider](#retrieve-provider)
	- [Retrieve providers](#retrieve-providers)
	- [Update provider](#update-provider)
	
- [SrcCollection](#srccollection)
	- [Create src collection](#create-src-collection)
	- [Delete src collection](#delete-src-collection)
	- [Retrieve src collection](#retrieve-src-collection)
	- [Retrieve src collections](#retrieve-src-collections)
	- [Update src collection](#update-src-collection)
	
- [Suscription](#suscription)
	- [Create suscription](#create-suscription)
	- [Delete suscription](#delete-suscription)
	- [Retrieve suscription](#retrieve-suscription)
	- [Retrieve suscriptions](#retrieve-suscriptions)
	- [Update suscription](#update-suscription)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Asset

## Create asset



	POST /assets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Asset's name.</p>							|
| srcCollection			| 			|  <p>Asset's srcCollection.</p>							|
| provider			| 			|  <p>Asset's provider.</p>							|
| apikey			| 			|  <p>Asset's apikey.</p>							|
| asset			| 			|  <p>Asset's asset.</p>							|

## Delete asset



	DELETE /assets/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve asset



	GET /assets/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve assets



	GET /assets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve assets by srcCollection



	GET /assets/srcCollection


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| srcCollection			| String			|  <p>id SrcCollection.</p>							|

## Retrieve assets by id SrcCollection from-to range



	GET /assets/token_range


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| srcCollection			| String			|  <p>id SrcCollection.</p>							|
| from			| Number			|  <p>name of the trait type to search.</p>							|
| to			| Number			|  <p>value of the trait type to search .</p>							|

## Retrieve assets by id SrcCollection trait_type and value



	GET /assets/trait_type


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| srcCollection			| String			|  <p>id SrcCollection.</p>							|
| trait_type			| String			|  <p>name of the trait type to search.</p>							|
| value			| String			|  <p>value of the trait type to search .</p>							|

## Update asset



	PUT /assets/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Asset's name.</p>							|
| srcCollection			| 			|  <p>Asset's srcCollection.</p>							|
| provider			| 			|  <p>Asset's provider.</p>							|
| apikey			| 			|  <p>Asset's apikey.</p>							|
| asset			| 			|  <p>Asset's asset.</p>							|

# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

## Authenticate with Github



	POST /auth/github


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Github user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# File

## Create file



	POST /files


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| file			| 			|  <p>File's file.</p>							|
| ext			| 			|  <p>File's ext.</p>							|
| name			| 			|  <p>File's name.</p>							|
| size			| 			|  <p>File's size.</p>							|
| mime			| 			|  <p>File's mime.</p>							|

## Delete file



	DELETE /files/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve file



	GET /files/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve files



	GET /files


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update file



	PUT /files/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| file			| 			|  <p>File's file.</p>							|
| ext			| 			|  <p>File's ext.</p>							|
| name			| 			|  <p>File's name.</p>							|
| size			| 			|  <p>File's size.</p>							|
| mime			| 			|  <p>File's mime.</p>							|

# Groups

## Create groups



	POST /groups


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Groups's name.</p>							|
| menus			| 			|  <p>Groups's menus.</p>							|

## Delete groups



	DELETE /groups/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve groups



	GET /groups


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update groups



	PUT /groups/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Groups's name.</p>							|
| menus			| 			|  <p>Groups's menus.</p>							|

# Menu

## Create menu



	POST /menus


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Menu's name.</p>							|
| menus			| 			|  <p>Menu's menus.</p>							|
| color			| 			|  <p>Menu's color.</p>							|
| icon			| 			|  <p>Menu's icon.</p>							|
| path			| 			|  <p>Menu's path.</p>							|

## Delete menu



	DELETE /menus/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve menu



	GET /menus/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve menus



	GET /menus


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update menu



	PUT /menus/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Menu's name.</p>							|
| menus			| 			|  <p>Menu's menus.</p>							|
| color			| 			|  <p>Menu's color.</p>							|
| icon			| 			|  <p>Menu's icon.</p>							|
| path			| 			|  <p>Menu's path.</p>							|

# Message

## Create message



	POST /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| to			| 			|  <p>Message's to.</p>							|
| from			| 			|  <p>Message's from.</p>							|
| message			| 			|  <p>Message's message.</p>							|

## Delete message



	DELETE /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve message



	GET /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve messages



	GET /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update message



	PUT /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| to			| 			|  <p>Message's to.</p>							|
| from			| 			|  <p>Message's from.</p>							|
| message			| 			|  <p>Message's message.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Process

## Create process



	POST /processes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Process's name.</p>							|
| provider			| 			|  <p>Process's provider.</p>							|

## Delete process



	DELETE /processes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve process



	GET /processes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve processes



	GET /processes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update process



	PUT /processes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Process's name.</p>							|
| provider			| 			|  <p>Process's provider.</p>							|

# Provider

## Create provider



	POST /providers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Provider's name.</p>							|
| keyId			| 			|  <p>Provider's keyId.</p>							|
| urlBase			| 			|  <p>Provider's urlBase.</p>							|

## Delete provider



	DELETE /providers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve provider



	GET /providers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve providers



	GET /providers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update provider



	PUT /providers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Provider's name.</p>							|
| keyId			| 			|  <p>Provider's keyId.</p>							|
| urlBase			| 			|  <p>Provider's urlBase.</p>							|

# SrcCollection

## Create src collection



	POST /srcCollections


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Src collection's name.</p>							|
| provider			| 			|  <p>Src collection's provider.</p>							|
| apikey			| 			|  <p>Src collection's apikey.</p>							|
| srcCollection			| 			|  <p>Src collection's srcCollection.</p>							|

## Delete src collection



	DELETE /srcCollections/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve src collection



	GET /srcCollections/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve src collections



	GET /srcCollections


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update src collection



	PUT /srcCollections/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Src collection's name.</p>							|
| provider			| 			|  <p>Src collection's provider.</p>							|
| apikey			| 			|  <p>Src collection's apikey.</p>							|
| srcCollection			| 			|  <p>Src collection's srcCollection.</p>							|

# Suscription

## Create suscription



	POST /suscriptions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Suscription's name.</p>							|
| validity			| 			|  <p>Suscription's validity.</p>							|
| price			| 			|  <p>Suscription's price.</p>							|

## Delete suscription



	DELETE /suscriptions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve suscription



	GET /suscriptions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve suscriptions



	GET /suscriptions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update suscription



	PUT /suscriptions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| name			| 			|  <p>Suscription's name.</p>							|
| validity			| 			|  <p>Suscription's validity.</p>							|
| price			| 			|  <p>Suscription's price.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


