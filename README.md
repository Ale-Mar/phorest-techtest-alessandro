# phorest-techtest-alessandro

I built a very simple UI with a basic navigation that allows the user to search for clients. Tapping on a client opens a detail screen, that allows the user to create a voucher.
After the voucher is created, a dialog is shown to confirm the voucher creation, and after user taps on 'ok' it closes the detail screen.<BR/>
For the newtworking I used the axios library and for both the network requests, are defined in a hook (useFetchClients and useCreateVoucher). I found very convenient this approach because it allowed me to easily handle the states, and, once I understood the testing framework basis, to easily cover the logic with unit tests.
<BR/><BR/>

####Doubts:
The tech test track has the following request:

"Handling when there are many of the same clients returned (with the same number or email)"

I used a FlatList to represent the clients returned by the API. I decieded to show multiple entries for those client with the same email or mobile, for me it made sense because I noticed the other clients data (firstName, lastName...) are different.
This could be the case of some members of the same family. Anyway if it was not a tech test, I would have asked clarifications to the POs.

Another doubt I had is related to the API to create vouchers. I can see in the example on the documentation that both "originalBalance" and "remainingBalance" are in the request.<BR/>
Since we're creating a voucher I don't think it makes sense to send both.
In fact I could see that the API sets for both the value of the originalBalance (no matter what the value is sent for remainingBalance).
I believe there was no point in sending "remainingBalance", again, if it was not a tech test I would have asked clarifications to backend devs.<BR/><BR/>

####Things that I didn't complete:
* I left strings hardcoded in code, I am aware it's important to localize them, but I didn't have time to study this in React Native
* All the tests succeed, however I can see there is a warning occurring multiple times, seems to be a frequent problem and I didn't have time to fix it.
* When I create a voucher with the API I just check that it returns 201, I should probably add more logic to verify that the response is correct.
* I didn't handle the pagination of the response, it's an improvement but I don't think is urgent, since usually very few clients are returned.
* I built a very simple UI, it could be improved.
* I didn't add validation on the Email and Amount TextInputs.