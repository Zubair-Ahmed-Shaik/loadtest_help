Steps
1. Add a counter, name the variable as tid, with starting value as 10 and ending value as 99 increment 1 for even character consideration for salt. If salt is of odd considerations, then starting value should be 100, ending value 999 increment 1.
2. Add a Beanshell sampler
3. Copy the script from the 1_SHA512_Hash_Primary_BeanShellSampler.txt file into this sampler.
4. I have created the script, considering the hash string has only request body and salt. Replace the req body in the beanshell sampler, and escape if there are any double quotes in the request body.
5. In If statement, then has code for even salt and else has code for odd salt. Depending upon the salt consideration, comment the other code.
6. Add a BeanShell preprocessor to the http sampler.
7. Copy the script from the 2_SHA512_Hash_BeanShell_PreProcessor.txt file in this preprocessor.
8. Use the varaible hashedstring1 wherever the hash has to be sent like request headers.
9. Paramterize the reqBody and token appropriately for the post body and request headers depending upon the requirement.

*** Thanks - ZAS***