# Airbnb app by stack ninjas

This is the backend repository to the Airbnb web app that will be a part of the fikracamps bootcamp, i (hasan aqeel) will be the one responsible for building and maintaining this repo;

-------------------------------------------------------------------DOCUMENTATION OF FUNCTIONS-----------------------------------------------------------------------


# THE POST METHODS

1-register: takes: firstName, image, middleName, lastName, email, phone, password. it will create a user and send an sms with an otp to verify the account

2-verify: takes: OTP. the number sent in an sms to activate the user account

3-login: takes: email OR phone and a password to allow the user to log in and use their account

4-sendreset: takes: phone number of an activated user account and sends a reset OTP **needs login session token**

5-resetpassword: takes: new password user wants to set and the OTP that was sent to the user in the sendreset method. resets the user password **needs login session token**

6-becomehost: takes: NOTHING. when sending a request to this route, the user sending this request is found through their session's token and has their status set to host **needs login session token**

7-postproeprty: takes: districtId, cityId, address, images, userId, price, bedrooms, bathrooms, size, longitude and latitude. This lists a new property under the user's name **needs login session token**

8-addpropertyimage: takes: propertyId, image. sets an image for the property with the provided id **needs login session token**

7-postreview: takes: propertyId, stars, title and body. Creates a full review by the tenant who used the place and paid the invoice **needs login session token**

9-addreviewimage: takes: reviewId, image. sets an image for the review with the provided id **needs login session token**

10-makeinvoice: takes:landlordId, propertyId, price,startHour, startMonth, endDay, endMonth. this invoice is created when a user clicks "checkout" on the desired proeprty **needs login session token**

11-accepttenant: takes: NOTHING. this link accepts the tenant who wants to rent the property **needs login session token**

12-notify: takes: recipientId and msg. this sends a certain user a message **needs login session token**


# THE GET METHOD
1-getinvoicelandlord: gets the invoices if the user is a landlord **needs login session token**

2-getinvoiceuser: gets invoices the user is paying **needs login session token**

3-getnotifications: gets all notification messages under the name of the user **needs login session token**

4-getlocation: returns all provinces with their respective cities and districts

5-getcityproperties: takes:cityId as a query. returns all properties within that city

6-getdistrictproperties: takes: districtId as a query. returns all properties within that district

7-getpropertyimages: takes: propertyId as a query. returns all images for that property

8-getpropertyreviews: takes: propertyId as a query. returns all reviews for that property with their images










