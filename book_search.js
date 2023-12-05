/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    const results = []
    for (const book of scannedTextObj) {
        for (const content of book.Content) {
            if (content.Text.includes(searchTerm)) {
                results.push({
                    ISBN: book.ISBN,
                    Page: content.Page,
                    Line: content.Line
                })
            };
        }
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results": results
    };

    return result;
}

/** Input object with more than one book */
const newBooks = [
    {
        "Title": "Harry Potter and the Philosopher's Stone",
        "ISBN": "9780747532743",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much."
            },
            {
                "Page": 2,
                "Line": 5,
                "Text": "He had discovered, almost by accident, that he himself could make things happen last year. This was, of course, a lot of responsibility..."
            }
        ]
    },
    {
        "Title": "To Kill a Mockingbird",
        "ISBN": "9780061120084",
        "Content": [
            {
                "Page": 10,
                "Line": 12,
                "Text": "When he was nearly thirteen year, my brother Jem got his arm badly broken at the elbow."
            },
            {
                "Page": 11,
                "Line": 3,
                "Text": "Atticus, he was real nice."
            }
        ]
    },
    {
        "Title": "The Great Gatsby",
        "ISBN": "9780743273565",
        "Content": [
            {
                "Page": 5,
                "Line": 8,
                "Text": "In my younger and more vulnerable years, my Brother gave me some advice that I've been turning over in my mind ever since."
            },
            {
                "Page": 6,
                "Line": 2,
                "Text": "I was within and without, simultaneously enchanted and repelled by the inexhaustible variety of life."
            }
        ]
    }
]

/** Example output object */
const positiveTestOut = {
    "SearchTerm": "year",
    "Results": [
        {
            "ISBN": "9780747532743",
            "Page": 2,
            "Line": 5
        },
        {
            "ISBN": "9780061120084",
            "Page": 10,
            "Line": 12
        },
        {
            "ISBN": "9780743273565",
            "Page": 5,
            "Line": 8
        }
    ]
}

const caseSensitiveTestOut = {
    "SearchTerm": "Brother",
    "Results": [
        {
            "ISBN": "9780743273565",
            "Page": 5,
            "Line": 8
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */


// Positive Test: Search term present in the text */
/** We can check that, given a known input, we get a known output. */
const positiveTest = findSearchTermInBooks("year", newBooks);
if (JSON.stringify(positiveTest) === JSON.stringify(positiveTestOut)) {
    console.log("PASS: Positive Test");
    console.log("Result:", JSON.stringify(positiveTest));
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", positiveTestOut.Results.length);
    console.log("Received:", positiveTest.Results.length);
}


// Negative Test: Search term not present in the text */

const negativeTest = findSearchTermInBooks("yearsss", newBooks);
if (negativeTest.Results.length == 0) {
    console.log("PASS: Negative Test");
    console.log("Result:", JSON.stringify(negativeTest));
} else {
    console.log("FAIL: Negative Test");
    console.log("Expected:", "0");
    console.log("Received:", negativeTest.Results.length);
}

// Case-Sensitive Test: Match on "Brother" but not on "brother"
const caseSensitiveTest = findSearchTermInBooks("Brother", newBooks);
if (caseSensitiveTest.Results.length == caseSensitiveTestOut.Results.length) {
    console.log("PASS: Case Sensitive Test");
    console.log("Result: ", JSON.stringify(caseSensitiveTest));
} else {
    console.log("FAIL: Case Sensitive Test");
    console.log("Expected:", caseSensitiveTestOut.Results.length);
    console.log("Received:", caseSensitiveTest.Results.length);
}

/**
Overall Process and Decision Making:
Understanding the Problem:
The initial step was to grasp the problem requirements. The task involved creating a JavaScript function that searches for a given term in a collection of books, returning matching lines with associated metadata. To tackle this, I needed a clear understanding of the input structure, expected output format, and the logical flow of the solution.

Analyzing the Data Structure:
The provided input was a JSON array containing books, each with a title, ISBN, and an array of content with page, line, and text information. I visualized this structure mentally and considered how to traverse it efficiently to find the matching lines.

Solution Design:
I opted for a nested loop approach to iterate through books and their content, checking if the search term is present in each line's text. If a match is found, I add relevant information to the results array. The final step is to encapsulate the results in the desired JSON format.

Code Implementation:
I wrote the code incrementally, testing at each step to ensure correctness. The use of clear variable names and concise logic was prioritized for readability. I avoided unnecessary complexity, keeping the solution straightforward.

Testing and Iteration:
Testing Strategy:
I adopted a test-driven development (TDD) approach, starting with positive tests (matching term present), followed by negative tests (non-matching term), and case-sensitive tests. Each test aimed to cover a specific aspect of the function's behavior.

Making the Test Suite More Robust:
If given more time, I would expand the test suite to include edge cases, such as empty input, empty content arrays, or special characters in the search term. Additionally, I'd explore using a testing framework like Mocha or Jest for a more structured and comprehensive test suite.

Proudest Aspect of the Solution:
I am proud of the simplicity and clarity of the code. The solution is concise, easy to understand, and adheres to best practices. This ensures maintainability and makes it accessible for future modifications.

Most Difficult Part:
The most challenging part was handling case-sensitive searches. It required careful consideration of the JavaScript includes method behavior and addressing potential issues related to case sensitivity in the search term.

In summary, the approach involved a clear understanding of the problem, strategic solution design, incremental coding with thorough testing, and a focus on simplicity and readability. The solution is adaptable and can be extended to handle additional cases with further testing and iteration.

*/
