# Summary

A basic react app that counts the frequency of words in a given input 
against a list of excluded words and returns a list of the most frequently 
used words up to the top 100.

### Text Input

A string of words can be input into the text field of any size. 
All spaces and special characters will be ignored with the exception of apostrophes and hyphens

### Stop Words

A user can create of words that will be exclude from the count.
Add a word or multiple words to the input and push the '+' button.
Spaces and commas will be ignored.
Individual words can be removed from the list or the entire list can be cleared.

### Get Example

Pressing the 'Get Example' button will run the program using Herman Melville's Moby Dick as the input.
A pregenerated list of stop words will be used including single characters and non-contentful words.

# Future Considerations

- Should the app enable reading .txt files directly? .doc/docx?
- Could files be uploaded for counting?
- Would seeing the example Stop Words list be useful?
- Could logic be done on backend server and sent to UI for faster browser computation? Serverless?
- Should visibility for certain components be togglable on mobile view?
- Could programmatic text be ignored to enable reading code files for SEO and keyword tracking?
- What further styling and UI optimization could be done to increase ease of use and/or reduce styling bloat?
