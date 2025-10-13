// Technical Test Bank - structure ready for multiple paper sets
// Add more papers to the array as they become available

export const technicalPapers = [
  {
    paperId: "tech-paper1",
    name: "Technical Paper 1 - Mixed Topics",
    duration: 60, // minutes
    totalQuestions: 60,
    questions: [
      {
        id: 1,
        question: "What will be the output of the following C code? int a = 5; int b = a++ + ++a;",
        options: ["10", "11", "12", "Undefined Behavior"],
        answer: "Undefined Behavior",
        explanation: "a is modified more than once between sequence points (a++ and ++a) in one expression, which is undefined behavior by the C standard."
      },
      {
        id: 2,
        question: "Predict the output: int arr[] = {10,20,30,40,50}; int *ptr = arr; printf(\"%d\", *(ptr++ + 2));",
        options: ["30", "20", "Compiler Error", "Garbage Value"],
        answer: "30",
        explanation: "ptr is used before post-increment; *(arr + 2) yields arr[2] which is 30, then ptr increments to arr+1."
      },
      {
        id: 3,
        question: "What is the output of C code: printf(\"%d\", sizeof(void));",
        options: ["0", "1", "2", "Compiler Error"],
        answer: "Compiler Error",
        explanation: "sizeof(void) is invalid; void is an incomplete type. sizeof(void*) is valid."
      },
      {
        id: 4,
        question: "Macro PRODUCT defined as #define PRODUCT(x) (x*x). What is PRODUCT(i+1) when i=3?",
        options: ["16", "10", "7", "12"],
        answer: "7",
        explanation: "Expands to (i+1*i+1). Due to precedence, 3 + 3 + 1 = 7. Proper macro should be ((x)*(x))."
      },
      {
        id: 5,
        question: "How many times will 'Hello' be printed? for(i=0;i<5;i++); printf(\"Hello\");",
        options: ["5 times", "1 time", "0 times", "Compiler Error"],
        answer: "1 time",
        explanation: "The semicolon terminates the loop; printf executes once after the loop."
      },
      {
        id: 6,
        question: "Output: char str[]=\"C-Program\"; printf(\"%s %s\\n\", str, str+2);",
        options: ["C-Program C-Program", "C-Program -Program", "C- -Program", "Compiler Error"],
        answer: "C-Program -Program",
        explanation: "str prints whole string; str+2 prints from third character '-'."
      },
      {
        id: 7,
        question: "In C, if you pass an array as a function argument, what is actually passed?",
        options: ["The first element of the array", "The base address of the array", "A copy of the array", "The size of the array"],
        answer: "The base address of the array",
        explanation: "Arrays decay to pointers to their first element when passed to functions."
      },
      {
        id: 8,
        question: "Purpose of static keyword for a local variable in a function?",
        options: ["Visible outside the function", "Allocated on heap", "Preserves value between calls", "Prevents modification"],
        answer: "Preserves value between calls",
        explanation: "Static locals retain value across function invocations and are initialized once."
      },
      {
        id: 9,
        question: "What is a dangling pointer?",
        options: ["Uninitialized pointer", "Pointer to NULL", "Pointer to freed memory", "Pointer to array start"],
        answer: "Pointer to freed memory",
        explanation: "Pointer referencing memory that has been deallocated or gone out of scope."
      },
      {
        id: 10,
        question: "C code: int x=10; float y=10.0; if(x==y) ... Output?",
        options: ["Equal", "Not Equal", "Compiler Error", "No output"],
        answer: "Equal",
        explanation: "x is promoted to float; 10.0 == 10.0 is true."
      },
      {
        id: 11,
        question: "Size of a union?",
        options: ["Sum of sizes", "Size of largest member", "Size of smallest member", "Always 4 bytes"],
        answer: "Size of largest member",
        explanation: "Union allocates enough memory to hold its largest member; members overlay."
      },
      {
        id: 12,
        question: "volatile keyword signifies?",
        options: ["Cannot be modified", "May change outside compiler control", "Stored in register", "Is a constant"],
        answer: "May change outside compiler control",
        explanation: "Signals to avoid optimizations; read from memory each access."
      },
      {
        id: 13,
        question: "Open file for reading and writing in binary mode (create/truncate)?",
        options: ["fopen(\"file.bin\", \"rw\");", "fopen(\"file.bin\", \"wb+\");", "fopen(\"file.bin\", \"r+w\");", "fopen(\"file.bin\", \"ab\");"],
        answer: "fopen(\"file.bin\", \"wb+\");",
        explanation: "wb+ opens for read/write in binary, creating/truncating."
      },
      {
        id: 14,
        question: "Output: int a=1,b=1,c; c=a++ + b; printf(\"a=%d,b=%d,c=%d\");",
        options: ["a = 2, b = 1, c = 2", "a = 1, b = 1, c = 2", "a = 2, b = 1, c = 3", "a = 1, b = 2, c = 2"],
        answer: "a = 2, b = 1, c = 2",
        explanation: "Post-increment uses a=1 then increments to 2; c=1+1=2."
      },
      {
        id: 15,
        question: "Predict output: int x=5; printf(\"%d %d %d\\n\", x, x<<1, x>>1);",
        options: ["5 10 2", "2 10 5", "Compiler-dependent", "5 2 10"],
        answer: "Compiler-dependent",
        explanation: "Order of evaluation of function arguments is unspecified in C."
      },
      {
        id: 16,
        question: "Role of extern keyword?",
        options: ["Declares without defining", "Gives static storage", "Makes variable file-local", "Initializes to zero"],
        answer: "Declares without defining",
        explanation: "extern declares a variable defined elsewhere (another translation unit)."
      },
      {
        id: 17,
        question: "typedef does what?",
        options: ["Creates a new type", "Creates alias for an existing type", "Defines a new variable", "Declares a function"],
        answer: "Creates alias for an existing type",
        explanation: "typedef introduces an alias name for an existing type."
      },
      {
        id: 18,
        question: "Value of x after: int x=10; x = x++;",
        options: ["10", "11", "9", "Undefined Behavior"],
        answer: "Undefined Behavior",
        explanation: "x is modified more than once without a sequence point; undefined in C."
      },
      {
        id: 19,
        question: "Difference between malloc() and calloc()?",
        options: ["malloc for single, calloc for multiple", "malloc zero-initializes", "calloc zero-initializes", "No difference"],
        answer: "calloc zero-initializes",
        explanation: "calloc initializes allocated memory to zero; malloc leaves it uninitialized."
      },
      {
        id: 20,
        question: "switch without breaks: x=3 prints?",
        options: ["Three", "Three Default", "Three Four Default", "Compiler Error"],
        answer: "Three Four Default",
        explanation: "Fall-through from case 3 to case 4 to default prints all of them."
      },
      {
        id: 21,
        question: "Pointer pointing to NOTHING is a ____ pointer.",
        options: ["VOID", "DANGLING", "NULL", "WILD"],
        answer: "NULL",
        explanation: "NULL denotes a pointer that points to no valid object."
      },
      {
        id: 22,
        question: "Correct signature of main with command-line args?",
        options: ["int main(int argv, char *argc)", "int main(char *argv[], int argc)", "int main(int argc, char *argv[])", "int main(char argc, int *argv)"],
        answer: "int main(int argc, char *argv[])",
        explanation: "argc = count, argv = array of pointers to C-strings."
      },
      {
        id: 23,
        question: "Endianness refers to?",
        options: ["Order of bits in a byte", "Order of bytes in multi-byte types", "Floating-point representation", "Max integer value"],
        answer: "Order of bytes in multi-byte types",
        explanation: "Big-endian stores MSB first; little-endian stores LSB first at lower addresses."
      },
      {
        id: 24,
        question: "Header for strcmp()?",
        options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<conio.h>"],
        answer: "<string.h>",
        explanation: "String comparison function strcmp is declared in <string.h>."
      },
      {
        id: 25,
        question: "Output: float f=0.1; if (f == 0.1) ...",
        options: ["Equal", "Not Equal", "Sometimes Equal, sometimes Not Equal", "Compiler Error"],
        answer: "Not Equal",
        explanation: "0.1 literal is double; comparing float to double often fails due to precision."
      },
      {
        id: 26,
        question: "C++ virtual dispatch: Base* b = new Derived(); b->show();",
        options: ["Base", "Derived", "Compiler Error", "Runtime Error"],
        answer: "Derived",
        explanation: "show is virtual; call resolves to Derived::show via dynamic dispatch."
      },
      {
        id: 27,
        question: "Construct/destruct order with Child derived from Parent, object Child c;",
        options: ["Parent Constructor Child Constructor Parent Destructor Child Destructor", "Child Constructor Parent Constructor Child Destructor Parent Destructor", "Parent Constructor Child Constructor Child Destructor Parent Destructor", "Child Constructor Parent Constructor Parent Destructor Child Destructor"],
        answer: "Parent Constructor Child Constructor Child Destructor Parent Destructor",
        explanation: "Base constructed first, then derived; destruction in reverse order."
      },
      {
        id: 28,
        question: "Two functions same name different parameters in same class demonstrates?",
        options: ["Function Overriding", "Function Overloading", "Operator Overloading", "Polymorphism"],
        answer: "Function Overloading",
        explanation: "Overloading = same name, different signatures, resolved at compile time."
      },
      {
        id: 29,
        question: "Issue in: MyClass* p = new MyClass[2]; delete p;",
        options: ["No issue", "Compile-time error", "Memory leak and undefined behavior", "Prints Destructed twice"],
        answer: "Memory leak and undefined behavior",
        explanation: "Must use delete[] for arrays; delete calls only first destructor."
      },
      {
        id: 30,
        question: "std::vector<int>::size() returns?",
        options: ["Number of elements", "Capacity before reallocation", "Size in bytes", "Pointer to last element"],
        answer: "Number of elements",
        explanation: "size() is count of elements; capacity() is reserved space."
      },
      {
        id: 31,
        question: "Primary difference between struct and class in C++?",
        options: ["struct members public by default; class members private by default", "struct cannot have member functions", "struct is value type; class is reference type", "No difference"],
        answer: "struct members public by default; class members private by default",
        explanation: "Default access differs; otherwise largely equivalent."
      },
      {
        id: 32,
        question: "Output with pass-by-reference modify(int& val){ val=100; } int x=50; modify(x);",
        options: ["50", "100", "Garbage Value", "Compiler Error"],
        answer: "100",
        explanation: "Reference binds to x; function assigns x = 100."
      },
      {
        id: 33,
        question: "Role of this pointer?",
        options: ["Points to base class", "Points to current object", "Void pointer to any", "Points to static member"],
        answer: "Points to current object",
        explanation: "Inside non-static member functions, this points to the object instance."
      },
      {
        id: 34,
        question: "throw keyword in C++ exception handling does what?",
        options: ["Catches an exception", "Specifies code to test for errors", "Signals an exceptional condition", "Defines handler block"],
        answer: "Signals an exceptional condition",
        explanation: "throw raises an exception to be caught by a matching catch block."
      },
      {
        id: 35,
        question: "Smart pointer for exclusive ownership?",
        options: ["std::shared_ptr", "std::weak_ptr", "std::unique_ptr", "std::auto_ptr (deprecated)"],
        answer: "std::unique_ptr",
        explanation: "unique_ptr expresses exclusive ownership and cannot be copied."
      },
      {
        id: 36,
        question: "RAII stands for?",
        options: ["Design pattern for managing resources", "Memory allocation technique", "Type of inheritance", "Template metaprogramming technique"],
        answer: "Design pattern for managing resources",
        explanation: "Resource Acquisition Is Initialization ties resource lifetime to object lifetime."
      },
      {
        id: 37,
        question: "Output: struct A { A(){cout<<\"A\";} A(const A&){cout<<\"Ac\";} }; A a; func(a);",
        options: ["A", "AAc", "Ac", "AA"],
        answer: "AAc",
        explanation: "Default constructor prints 'A'; pass by value calls copy constructor printing 'Ac'."
      },
      {
        id: 38,
        question: "Rule of Three in C++?",
        options: ["Constructor implies empty constructor and destructor", "At most three base classes", "If a class defines destructor/copy ctor/copy assign, it should probably define all three", "A function should not have more than three arguments"],
        answer: "If a class defines destructor/copy ctor/copy assign, it should probably define all three",
        explanation: "Classes managing resources need all three to manage ownership correctly."
      },
      {
        id: 39,
        question: "Meaning of const at end of member function: void print() const;",
        options: ["Function returns const value", "Function cannot be overridden", "Function cannot modify member variables", "Function only callable on const objects"],
        answer: "Function cannot modify member variables",
        explanation: "const member functions promise not to change object state."
      },
      {
        id: 40,
        question: "What is a V-Table?",
        options: ["Table for variables", "Mechanism to achieve dynamic polymorphism", "Table of contents for class", "Static table shared by all objects"],
        answer: "Mechanism to achieve dynamic polymorphism",
        explanation: "V-Table holds pointers to virtual functions for runtime dispatch."
      },
      {
        id: 41,
        question: "C++ vector reference: pushing via reference affects original? std::vector<int>& ref = v; ref.push_back(4); v.size()?",
        options: ["3", "4", "0", "Compiler Error"],
        answer: "4",
        explanation: "ref aliases v; push_back on ref mutates v."
      },
      {
        id: 42,
        question: "Static member variables are?",
        options: ["Each object has its own copy", "Only accessed by static member functions", "Shared among all objects", "Initialized by constructor"],
        answer: "Shared among all objects",
        explanation: "Static members belong to class, single storage shared by all instances."
      },
      {
        id: 43,
        question: "Function overriding is?",
        options: ["Same name different parameters", "Derived class redefines base virtual function", "Creating a template function", "Deleting a base function"],
        answer: "Derived class redefines base virtual function",
        explanation: "Overriding provides specific implementation in derived class for virtual base method."
      },
      {
        id: 44,
        question: "Purpose of friend keyword?",
        options: ["Allow access to private/protected members", "Specify inheritance", "Create alias for class", "Make member variable constant"],
        answer: "Allow access to private/protected members",
        explanation: "friend grants external function/class access to internals of declaring class."
      },
      {
        id: 45,
        question: "std::move is used to?",
        options: ["Move a file", "Cast to rvalue reference enabling move semantics", "Reallocate memory", "Copy an object"],
        answer: "Cast to rvalue reference enabling move semantics",
        explanation: "std::move produces an xvalue, enabling move constructors/assignments."
      },
      {
        id: 46,
        question: "Difference between delete and delete[]?",
        options: ["delete for pointers, delete[] for arrays", "delete calls one destructor, delete[] calls all", "delete[] is faster", "Both A and B"],
        answer: "Both A and B",
        explanation: "delete for single objects; delete[] for arrays; delete[] calls destructor for each element."
      },
      {
        id: 47,
        question: "Which is a sequence container?",
        options: ["std::set", "std::map", "std::vector", "std::unordered_map"],
        answer: "std::vector",
        explanation: "Sequence containers store linear sequences: vector, deque, list, array."
      },
      {
        id: 48,
        question: "Lambda expression in C++11 is?",
        options: ["Anonymous function object", "Preprocessor macro", "Variable keyword", "Template specialization"],
        answer: "Anonymous function object",
        explanation: "Lambda creates an unnamed function object, convenient for algorithms."
      },
      {
        id: 49,
        question: "Scope resolution operator?",
        options: [".", "->", "&", "::"],
        answer: "::",
        explanation: "Used to qualify names with namespace/class scope, access static members, etc."
      },
      {
        id: 50,
        question: "Pure virtual function is?",
        options: ["Virtual function initialized to 0", "Function that cannot be overridden", "Virtual function with no implementation in base", "Callable only from derived"],
        answer: "Virtual function with no implementation in base",
        explanation: "Declared with =0; makes the class abstract."
      },
      {
        id: 51,
        question: "Java Strings: s1=\"Java\", s2=new String(\"Java\"), s3=\"Java\"; s1==s2 and s1==s3?",
        options: ["true true", "false true", "true false", "false false"],
        answer: "false true",
        explanation: "s1 in string pool; s2 heap object; s3 same pool literal as s1."
      },
      {
        id: 52,
        question: "Java try/catch/finally with division by zero prints?",
        options: ["ACDE", "ABDE", "AC", "ADE"],
        answer: "ACDE",
        explanation: "Prints A, exception triggers catch C, finally D always, then E after block."
      },
      {
        id: 53,
        question: "NOT a core OOP concept?",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Procedure"],
        answer: "Procedure",
        explanation: "OOP core includes encapsulation, inheritance, polymorphism, abstraction."
      },
      {
        id: 54,
        question: "Difference between abstract class and interface in Java (pre-Java 8)?",
        options: ["Abstract class can have instance variables; interface cannot", "Interface can have constructors", "Class can extend multiple abstract classes", "Abstract class only has abstract methods"],
        answer: "Abstract class can have instance variables; interface cannot",
        explanation: "Pre-Java 8 interfaces had only constants and abstract methods."
      },
      {
        id: 55,
        question: "Java ArrayList insertion: list.add(\"A\"); list.add(\"B\"); list.add(1, \"C\"); prints?",
        options: ["[A, B, C]", "[A, C, B]", "[C, A, B]", "[A, B]"],
        answer: "[A, C, B]",
        explanation: "add(index, e) inserts at index, shifting elements to the right."
      },
      {
        id: 56,
        question: "Which statement about final in Java is FALSE?",
        options: ["A final class cannot be subclassed", "A final method cannot be overridden", "The value of a final variable cannot be changed", "A final method cannot be overloaded"],
        answer: "A final method cannot be overloaded",
        explanation: "final relates to overriding; overloading is unaffected."
      },
      {
        id: 57,
        question: "Default values of uninitialized instance variables int and String?",
        options: ["0 and \"\"", "0 and null", "null and null", "Compilation Error"],
        answer: "0 and null",
        explanation: "Java defaults: numeric primitives to 0, reference types to null."
      },
      {
        id: 58,
        question: "Primary purpose of Java garbage collection?",
        options: ["Remove unused classes", "Clean up disk temp files", "Automatically free memory of unreachable objects", "Close unclosed DB connections"],
        answer: "Automatically free memory of unreachable objects",
        explanation: "GC reclaims memory from objects no longer reachable."
      },
      {
        id: 59,
        question: "Collection storing key-value pairs with no duplicate keys?",
        options: ["ArrayList", "HashSet", "HashMap", "TreeMap"],
        answer: "HashMap",
        explanation: "HashMap implements Map, stores key-value pairs with unique keys."
      },
      {
        id: 60,
        question: "How to create a thread in Java?",
        options: ["Extend Thread or implement Runnable", "Create Process", "Call start() on any Object", "Implement Serializable"],
        answer: "Extend Thread or implement Runnable",
        explanation: "Standard approaches: extend Thread or implement Runnable (preferred)."
      }
    ]
  },
  {
    paperId: "tech-paper2",
    name: "Technical Paper 2 - Advanced Programming Concepts",
    duration: 60, // minutes
    totalQuestions: 60,
    questions: [
      {
        id: 1,
        question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\nint arr[5] = {1, 2, 3, 4, 5};\nint *p = arr;\nprintf(\"%d\\n\", *(p + 2));\nreturn 0;\n}",
        options: ["2", "3", "4", "Garbage Value"],
        answer: "3",
        explanation: "The pointer `p` points to the first element of the array `arr`. The expression `*(p + 2)` dereferences the address of the third element of the array (index 2), which is 3."
      },
      {
        id: 2,
        question: "What does the following C++ program print?\n#include <iostream>\nstruct Node {\nint x;\nNode* next;\n};\nint main() {\nNode* n1 = new Node{10, nullptr};\nNode* n2 = n1;\nn2->x = 20;\nstd::cout << n1->x << std::endl;\nreturn 0;\n}",
        options: ["10", "20", "0", "Compiler Error"],
        answer: "20",
        explanation: "`n1` and `n2` are pointers that point to the same `Node` object in memory. Modifying the data through `n2` (i.e., `n2->x = 20`) changes the object's `x` member. Since `n1` points to that same object, accessing `n1->x` will reflect this change."
      },
      {
        id: 3,
        question: "What is the output of the following Java code snippet?\nimport java.util.HashMap;\npublic class Test {\npublic static void main(String[] args) {\nHashMap<String, Integer> map = new HashMap<>();\nmap.put(\"A\", 1);\nmap.put(\"A\", 2);\nSystem.out.println(map.get(\"A\"));\n}\n}",
        options: ["1", "2", "null", "An exception is thrown"],
        answer: "2",
        explanation: "In a `HashMap`, if you `put` a key that already exists, the new value will overwrite the old value. In this case, the key \"A\" is first associated with the value 1, and then it is updated to be associated with the value 2."
      },
      {
        id: 4,
        question: "Consider a table named `Products` with columns `ProductID`, `ProductName`, and `Price`. What does this SQL query do?\nSELECT COUNT(DISTINCT Price) FROM Products;",
        options: ["Counts all products.", "Counts the number of unique product prices.", "Returns the highest price.", "Counts the number of products with a price."],
        answer: "Counts the number of unique product prices.",
        explanation: "`COUNT(Price)` would count all non-NULL prices. The `DISTINCT` keyword causes the `COUNT` function to only consider unique values in the `Price` column."
      },
      {
        id: 5,
        question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\nchar str[] = \"Hello\";\nstr[1] = 'a';\nprintf(\"%s\\n\", str);\nreturn 0;\n}",
        options: ["Hello", "Hallo", "Hbllo", "Compilation Error"],
        answer: "Hallo",
        explanation: "A string literal used to initialize a character array is modifiable. `str[1]` accesses the second character ('e') and changes it to 'a'. The `printf` then prints the modified string."
      },
      {
        id: 6,
        question: "What is the output of this C++ code snippet?\n#include <iostream>\nclass Parent {\npublic:\nvoid show() { std::cout << \"Parent \"; }\n};\nclass Child : public Parent {\npublic:\nvoid show() { std::cout << \"Child \"; }\n};\nint main() {\nParent *p = new Child();\np->show();\ndelete p;\nreturn 0;\n}",
        options: ["Parent", "Child", "Parent Child", "Undefined Behavior"],
        answer: "Parent",
        explanation: "The `show()` function in the `Parent` class is not declared as `virtual`. Therefore, the call `p->show()` is resolved at compile time based on the type of the pointer (`Parent*`), not the type of the object it points to (`Child`). This is an example of static binding."
      },
      {
        id: 7,
        question: "What is the output of the following Java program?\npublic class Test {\npublic static void main(String[] args) {\nString s1 = \"abc\";\nString s2 = new String(\"abc\");\nif (s1.equals(s2)) {\nSystem.out.print(\"1\");\n}\nif (s1 == s2) {\nSystem.out.print(\"2\");\n}\n}\n}",
        options: ["1", "2", "12", "No output"],
        answer: "1",
        explanation: "`.equals()` compares the content of the strings, which is identical (\"abc\"), so it returns true. The `==` operator compares object references. `s1` refers to an object in the string pool, while `s2` refers to a new object created in the heap. Since they are different objects, `s1 == s2` is false."
      },
      {
        id: 8,
        question: "Given a `Students` table with `StudentID` and `Score`, what will this SQL query produce?\nSELECT * FROM Students ORDER BY Score DESC LIMIT 1;",
        options: ["The student with the lowest score.", "All students sorted by score.", "The student with the highest score.", "The first student entered into the table."],
        answer: "The student with the highest score.",
        explanation: "`ORDER BY Score DESC` sorts the students in descending order of their scores. `LIMIT 1` then restricts the output to only the first row from the sorted result, which will be the student with the highest score."
      },
      {
        id: 9,
        question: "Predict the output of this C code snippet:\n#include <stdio.h>\nint main() {\nint a = 5, b = 3;\nprintf(\"%d\\n\", a & b);\nreturn 0;\n}",
        options: ["5", "3", "1", "7"],
        answer: "1",
        explanation: "The `&` operator performs a bitwise AND operation. The binary representation of 5 is `101` and the binary representation of 3 is `011`. Performing a bitwise AND (`101` & `011`) results in `001`, which is 1 in decimal."
      },
      {
        id: 10,
        question: "What is the output of the following C++ code?\n#include <iostream>\n#include <vector>\nint main() {\nstd::vector<int> v;\nv.push_back(10);\nv.push_back(20);\nstd::cout << v.size() << \" \" << v.capacity() << std::endl;\nreturn 0;\n}",
        options: ["2 0", "2 1", "2 2", "Output is implementation-defined."],
        answer: "Output is implementation-defined.",
        explanation: "`size()` will correctly return 2. However, the `capacity()` of a vector is implementation-defined. A common growth strategy is to double the capacity, so it could be 2, but it could also be a different value depending on the standard library implementation."
      },
      {
        id: 11,
        question: "What is printed by the following Java code?\npublic class Test {\npublic static void main(String[] args) {\nStringBuilder sb = new StringBuilder(\"Hello\");\nsb.append(\" World\");\nsb.reverse();\nSystem.out.println(sb);\n}\n}",
        options: ["Hello World", "dlroW olleH", "World olleH", "olleH dlroW"],
        answer: "dlroW olleH",
        explanation: "`sb` first becomes \"Hello World\". The `.reverse()` method reverses the entire character sequence in place, resulting in \"dlroW olleH\"."
      },
      {
        id: 12,
        question: "A table `Orders` has a column `CustomerID`. How do you find which customers have placed more than 10 orders?\nSELECT CustomerID FROM Orders GROUP BY CustomerID HAVING COUNT(CustomerID) > 10;",
        options: ["This query is correct.", "It should use `WHERE COUNT(CustomerID) > 10`.", "It should not use `GROUP BY`.", "It should use `WHERE CustomerID > 10`."],
        answer: "This query is correct.",
        explanation: "To filter groups based on an aggregate function (like `COUNT()`), you must use the `HAVING` clause. The `WHERE` clause is used to filter rows before they are grouped. This query correctly groups orders by `CustomerID` and then filters for those groups having a count greater than 10."
      },
      {
        id: 13,
        question: "What is the output of the following C code?\n#include <stdio.h>\nvoid func(int *px) {\n*px = 30;\n}\nint main() {\nint x = 10;\nfunc(&x);\nprintf(\"%d\\n\", x);\nreturn 0;\n}",
        options: ["10", "30", "0", "Garbage Value"],
        answer: "30",
        explanation: "The address of `x` is passed to `func`. Inside `func`, the pointer `px` is dereferenced, and the value at that address (the value of `x` in `main`) is changed to 30. This is an example of pass-by-reference using pointers."
      },
      {
        id: 14,
        question: "What is the output of this C++ program?\n#include <iostream>\nint main() {\ntry {\nthrow 'a';\n} catch (int x) {\nstd::cout << \"Caught int \";\n} catch (char x) {\nstd::cout << \"Caught char \";\n} catch (...) {\nstd::cout << \"Caught generic \";\n}\nreturn 0;\n}",
        options: ["Caught int", "Caught char", "Caught generic", "No output, program terminates"],
        answer: "Caught char",
        explanation: "An exception of type `char` is thrown. The `catch` blocks are checked in order. The `catch (int x)` block does not match. The `catch (char x)` block is a perfect match for the type of exception thrown, so it is executed."
      },
      {
        id: 15,
        question: "What is the output of the Java code?\nimport java.util.HashSet;\npublic class Test {\npublic static void main(String[] args) {\nHashSet<String> set = new HashSet<>();\nset.add(\"A\");\nset.add(\"B\");\nboolean added = set.add(\"A\");\nSystem.out.println(set.size() + \" \" + added);\n}\n}",
        options: ["2 true", "2 false", "3 true", "3 false"],
        answer: "2 false",
        explanation: "A `HashSet` only stores unique elements. The second attempt to add \"A\" will fail because \"A\" is already in the set. The `.add()` method returns `false` if the element is already present. The size of the set remains 2."
      },
      {
        id: 16,
        question: "Which SQL statement is used to delete a table from a database?\nDROP TABLE Customers;",
        options: ["`DELETE TABLE Customers;`", "`TRUNCATE TABLE Customers;`", "This query is correct.", "`REMOVE TABLE Customers;`"],
        answer: "This query is correct.",
        explanation: "The `DROP TABLE` statement is used to remove a table definition, its data, indexes, triggers, constraints, and permission specifications. `DELETE` and `TRUNCATE` remove rows from a table but do not remove the table itself."
      },
      {
        id: 17,
        question: "What is the behavior of the following C code?\n#include <stdio.h>\nint main() {\nconst int val = 10;\nint *ptr = (int*)&val;\n*ptr = 20;\nprintf(\"%d\\n\", val);\nreturn 0;\n}",
        options: ["10", "20", "Compiler Error", "Undefined Behavior"],
        answer: "Undefined Behavior",
        explanation: "Attempting to modify a `const`-qualified object through a pointer results in undefined behavior. The compiler might place `val` in read-only memory. While the code may compile with a cast, the runtime behavior is not guaranteed by the C standard. It might crash, print 10, or print 20."
      },
      {
        id: 18,
        question: "What is printed by this C++ code?\n#include <iostream>\nstruct Point {\nint x, y;\nPoint() : x(0), y(0) {}\nPoint(int a, int b) : x(a), y(b) {}\n};\nint main() {\nPoint p1;\nPoint p2 = Point(5, 10);\nstd::cout << p1.x << \" \" << p2.y << std::endl;\nreturn 0;\n}",
        options: ["0 10", "0 0", "5 10", "Compiler Error"],
        answer: "0 10",
        explanation: "`p1` is created using the default constructor `Point()`, which initializes `x` and `y` to 0. `p2` is created using the parameterized constructor, which initializes its members to 5 and 10. The code then prints `p1.x` (which is 0) and `p2.y` (which is 10)."
      },
      {
        id: 19,
        question: "What does this Java code output?\ninterface Animal {\nvoid sound();\n}\nclass Dog implements Animal {\npublic void sound() {\nSystem.out.println(\"Woof\");\n}\n}\npublic class Test {\npublic static void main(String[] args) {\nAnimal a = new Dog();\na.sound();\n}\n}",
        options: ["Woof", "sound", "null", "Compilation Error"],
        answer: "Woof",
        explanation: "This is an example of polymorphism. An object of the `Dog` class is created and assigned to a reference variable of the `Animal` interface type. When `a.sound()` is called, Java uses dynamic method dispatch to call the `sound()` method of the actual object, which is `Dog`, so \"Woof\" is printed."
      },
      {
        id: 20,
        question: "What is the purpose of an index in a database?",
        options: ["To ensure data integrity.", "To speed up data retrieval operations.", "To store data in a sorted order.", "To enforce uniqueness."],
        answer: "To speed up data retrieval operations.",
        explanation: "An index is a special lookup table that the database search engine can use to speed up data retrieval. Simply put, an index is a pointer to data in a table. It works like the index in the back of a book. While some indexes can enforce uniqueness, their primary purpose is performance."
      },
      {
        id: 21,
        question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\nint x = 10;\nprintf(\"%d %d %d\\n\", x, x++, ++x);\nreturn 0;\n}",
        options: ["12 11 12", "10 10 12", "12 10 11", "Undefined Behavior"],
        answer: "Undefined Behavior",
        explanation: "The order of evaluation of arguments to a function call is not specified by the C standard. The compiler is free to evaluate `x`, `x++`, and `++x` in any order. Because the variable `x` is modified and accessed multiple times without an intervening sequence point, the behavior is undefined."
      },
      {
        id: 22,
        question: "What is the output of the C++ code below?\n#include <iostream>\nclass MyClass {\npublic:\nint val;\nMyClass(int v) : val(v) { std::cout << \"C \"; }\nMyClass(const MyClass& other) : val(other.val) { std::cout << \"CC \"; }\n};\nvoid func(MyClass obj) {\nstd::cout << \"F \";\n}\nint main() {\nMyClass m(10);\nfunc(m);\nreturn 0;\n}",
        options: ["C F", "C CC F", "CC F", "C F CC"],
        answer: "C CC F",
        explanation: "First, the object `m` is created using the constructor, printing \"C \". Then, `m` is passed by value to `func`. This creates a copy of `m` for the function's parameter, which calls the copy constructor, printing \"CC \". Finally, the body of `func` is executed, printing \"F \"."
      },
      {
        id: 23,
        question: "What is the result of running this Java code?\npublic class Test {\nstatic {\nSystem.out.print(\"S \");\n}\npublic static void main(String[] args) {\nSystem.out.print(\"M \");\n}\n}",
        options: ["M S", "S M", "S", "M"],
        answer: "S M",
        explanation: "Static blocks are executed when the class is first loaded into memory by the JVM. This happens before the `main` method is called. Therefore, \"S \" is printed first, followed by \"M \" from the `main` method."
      },
      {
        id: 24,
        question: "What does the `LEFT JOIN` keyword do in SQL?\nSELECT * FROM Customers LEFT JOIN Orders ON Customers.ID = Orders.CustomerID;",
        options: ["Returns all records from the `Orders` table, and the matched records from the `Customers` table.", "Returns records that have matching values in both tables.", "Returns all records from the `Customers` table, and the matched records from the `Orders` table.", "Returns all records from both tables."],
        answer: "Returns all records from the `Customers` table, and the matched records from the `Orders` table.",
        explanation: "A `LEFT JOIN` returns all rows from the left table (`Customers`) and the matched rows from the right table (`Orders`). If there is no match in the right table, the result is `NULL` on the right side."
      },
      {
        id: 25,
        question: "Predict the output of this C code:\n#include <stdio.h>\nint main() {\nint i = 0;\nfor (i = 0; i < 5; i++);\nprintf(\"%d\\n\", i);\nreturn 0;\n}",
        options: ["4", "5", "0", "Compiler Error"],
        answer: "5",
        explanation: "The semicolon at the end of the `for` loop `for (i = 0; i < 5; i++);` makes it an empty loop. The loop will execute 5 times (for i = 0, 1, 2, 3, 4). On the last iteration, `i` becomes 5, the condition `5 < 5` becomes false, and the loop terminates. The `printf` statement then prints the final value of `i`, which is 5."
      },
      {
        id: 26,
        question: "What does this C++ code snippet output?\n#include <iostream>\nint main() {\nconst int x = 5;\n// x = 10;\nint *p = (int*)&x;\n*p = 10;\nstd::cout << x << \" \" << *p << std::endl;\nreturn 0;\n}",
        options: ["5 10", "10 10", "5 5", "Undefined Behavior"],
        answer: "Undefined Behavior",
        explanation: "Attempting to modify a `const` object results in undefined behavior. The compiler might perform optimizations based on the `const` declaration (e.g., replacing all uses of `x` with the literal `5`). The output is not guaranteed and can vary between compilers and optimization levels."
      },
      {
        id: 27,
        question: "What is the output of the Java code?\npublic class Test {\npublic static void main(String[] args) {\nfinal String message;\nmessage = \"Hello\";\n// message = \"World\";\nSystem.out.println(message);\n}\n}",
        options: ["World", "Hello", "null", "Compilation Error"],
        answer: "Hello",
        explanation: "A `final` local variable is a blank final variable that can be assigned a value only once. Here `message` is assigned \"Hello\". The commented out line `message = \"World\";` would cause a compilation error if uncommented, but as it is, the code compiles and runs, printing \"Hello\"."
      },
      {
        id: 28,
        question: "What is the primary purpose of database normalization?",
        options: ["To make the database run faster.", "To reduce data redundancy and improve data integrity.", "To increase database security.", "To create a denormalized schema for reporting."],
        answer: "To reduce data redundancy and improve data integrity.",
        explanation: "Normalization is the process of organizing columns and tables in a relational database to minimize data redundancy. Its main goals are to eliminate undesirable characteristics like Insertion, Update, and Deletion Anomalies, thus improving data integrity."
      },
      {
        id: 29,
        question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\nprintf(\"%ld\\n\", sizeof(void*));\nreturn 0;\n}",
        options: ["2", "4", "8", "Depends on the system architecture (32-bit or 64-bit)"],
        answer: "Depends on the system architecture (32-bit or 64-bit)",
        explanation: "The size of a pointer (`void*` is a generic pointer) depends on the memory architecture of the machine it is compiled for. On a 32-bit system, it will typically be 4 bytes. On a 64-bit system, it will be 8 bytes."
      },
      {
        id: 30,
        question: "What is a smart pointer in C++?",
        options: ["A class that wraps a raw pointer to manage its lifetime.", "A pointer that automatically converts between types.", "A pointer that can point to member functions.", "A raw pointer that is faster than normal pointers."],
        answer: "A class that wraps a raw pointer to manage its lifetime.",
        explanation: "Smart pointers (like `std::unique_ptr` and `std::shared_ptr`) are objects that act like pointers but provide automatic memory management. They automatically deallocate the memory they point to when they go out of scope, helping to prevent memory leaks."
      },
      {
        id: 31,
        question: "What is the output of this Java code snippet?\npublic class Test {\npublic static void main(String[] args) {\ntry {\nSystem.out.print(\"1\");\nreturn;\n} finally {\nSystem.out.print(\"2\");\n}\n}\n}",
        options: ["1", "2", "12", "21"],
        answer: "12",
        explanation: "The `finally` block is always executed, even if a `return` statement is encountered in the `try` block. The `try` block executes, printing \"1\". Before the `main` method actually returns, the `finally` block is executed, printing \"2\". Then the method returns."
      },
      {
        id: 32,
        question: "What is the default transaction isolation level in most relational databases like PostgreSQL and SQL Server?",
        options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
        answer: "READ COMMITTED",
        explanation: "`READ COMMITTED` is a common default isolation level. It guarantees that any data read is committed at the moment it is read. It prevents \"dirty reads,\" where a transaction might read data that has been modified but not yet committed by another transaction."
      },
      {
        id: 33,
        question: "What will be printed by the following C code?\n#include <stdio.h>\nint main() {\nfloat f = 0.1;\nif (f == 0.1)\nprintf(\"Equal\\n\");\nelse\nprintf(\"Not Equal\\n\");\nreturn 0;\n}",
        options: ["Equal", "Not Equal", "It depends on the compiler", "Compilation Error"],
        answer: "It depends on the compiler",
        explanation: "Comparing floating-point numbers for exact equality is problematic due to representation errors. The literal `0.1` is of type `double` by default. The `float` variable `f` may not be able to represent 0.1 exactly. The comparison `f == 0.1` promotes `f` to a `double` and then compares. This comparison might succeed or fail depending on the specific floating-point representation and compiler behavior. The safe way is to check if the absolute difference is within a small tolerance."
      },
      {
        id: 34,
        question: "What is the output of this C++ code?\n#include <iostream>\nstruct A {\nA() { std::cout << \"A\"; }\n~A() { std::cout << \"~A\"; }\n};\nstruct B {\nA a;\nB() { std::cout << \"B\"; }\n~B() { std::cout << \"~B\"; }\n};\nint main() {\nB b;\nreturn 0;\n}",
        options: ["AB~A~B", "BA~B~A", "AB~B~A", "BA~A~B"],
        answer: "AB~B~A",
        explanation: "When object `b` of type `B` is constructed, its member variable `a` must be constructed first, printing \"A\". Then, the constructor of `B` runs, printing \"B\". Destructors are called in the reverse order of construction. First, the destructor of `B` runs, printing \"~B\". Then the destructor of the member variable `a` runs, printing \"~A\"."
      },
      {
        id: 35,
        question: "In Java, what is the `volatile` keyword used for?",
        options: ["To make a variable's value constant.", "To indicate that a variable's value will be modified by different threads.", "To prevent a method from being overridden.", "To mark a variable for garbage collection."],
        answer: "To indicate that a variable's value will be modified by different threads.",
        explanation: "The `volatile` keyword ensures that reads and writes to a variable are atomic and that any write to a volatile variable is visible to other threads. It prevents the compiler from performing certain optimizations, like caching the variable's value in a register, ensuring that each read fetches the value from main memory."
      },
      {
        id: 36,
        question: "Which SQL clause is used with aggregate functions to filter group results?",
        options: ["WHERE", "LIKE", "HAVING", "JOIN"],
        answer: "HAVING",
        explanation: "The `HAVING` clause was added to SQL because the `WHERE` keyword could not be used with aggregate functions like `COUNT()`, `SUM()`, etc. `HAVING` filters the results after the grouping has been done."
      },
      {
        id: 37,
        question: "Predict the output of this C code snippet.\n#include <stdio.h>\nint main() {\nchar s[] = \"ABC\";\nprintf(\"%c\\n\", s[3]);\nreturn 0;\n}",
        options: ["C", "Garbage Value", "The null character", "Runtime Error"],
        answer: "The null character",
        explanation: "A string literal in C is terminated by a null character (`\\0`). The array `s` is initialized with the characters 'A', 'B', 'C', and `\\0`. So its size is 4. `s[3]` accesses the fourth element, which is the null terminator. Printing it as a character may result in no visible output, but the character itself is the null character."
      },
      {
        id: 38,
        question: "What is RAII in C++?",
        options: ["A design pattern for exception handling.", "Resource Acquisition Is Initialization.", "A memory allocation technique.", "A way to achieve runtime polymorphism."],
        answer: "Resource Acquisition Is Initialization.",
        explanation: "RAII is a core C++ programming technique where you bind the life cycle of a resource (like allocated memory, a file handle, or a network socket) to the lifetime of an object. The resource is acquired in the object's constructor and released in its destructor. This helps prevent resource leaks. Smart pointers are a prime example of RAII."
      },
      {
        id: 39,
        question: "What will the following Java code print?\nimport java.util.Optional;\npublic class Test {\npublic static void main(String[] args) {\nOptional<String> name = Optional.empty();\nSystem.out.println(name.orElse(\"Default\"));\n}\n}",
        options: ["Default", "null", "An exception is thrown", "No output"],
        answer: "Default",
        explanation: "`Optional.empty()` creates an empty `Optional` instance. The `.orElse()` method is used to retrieve the value if one is present, or return a default value if the `Optional` is empty. In this case, since the optional is empty, it returns the string \"Default\"."
      },
      {
        id: 40,
        question: "What is a Foreign Key?",
        options: ["A key that uniquely identifies a record in a table.", "A key used to link two tables together.", "A key that can be null.", "The main key of the database."],
        answer: "A key used to link two tables together.",
        explanation: "A Foreign Key is a field (or collection of fields) in one table that uniquely identifies a row of another table. It is used to establish and enforce a link between the data in two tables."
      },
      {
        id: 41,
        question: "What is the output of the C code?\n#include <stdio.h>\nint main() {\nint x = 5;\nint y = (x++, ++x);\nprintf(\"%d %d\\n\", x, y);\nreturn 0;\n}",
        options: ["7 7", "6 7", "7 6", "6 6"],
        answer: "7 7",
        explanation: "The comma operator `,` evaluates the left operand (and discards the result) and then evaluates the right operand, and the result of the whole expression is the result of the right operand. In `(x++, ++x)`, first `x++` is evaluated. `x` becomes 6. Then `++x` is evaluated. `x` becomes 7, and the result of this expression is 7. This result (7) is assigned to `y`. Finally, the value of `x` is 7 and the value of `y` is 7."
      },
      {
        id: 42,
        question: "What happens when a reference variable in C++ is not initialized?",
        options: ["It points to a null location.", "It gets a garbage value.", "It results in a compile-time error.", "It is automatically initialized to zero."],
        answer: "It results in a compile-time error.",
        explanation: "References in C++ must be initialized when they are declared. They cannot be null or uninitialized. A reference is an alias for an existing object, so it must be bound to an object at the time of its creation."
      },
      {
        id: 43,
        question: "What is the output of this Java code?\npublic class Test {\npublic static void main(String args[]) {\nInteger i1 = 127;\nInteger i2 = 127;\nSystem.out.println(i1 == i2);\n}\n}",
        options: ["true", "false", "Compiler Error", "Runtime Error"],
        answer: "true",
        explanation: "Java caches `Integer` objects for values in the range of -128 to 127. When `i1` and `i2` are created with the value 127, they both point to the same cached object from the integer pool, so the reference comparison `i1 == i2` returns true."
      },
      {
        id: 44,
        question: "What does the SQL `COALESCE` function do?",
        options: ["Converts a value to a different datatype.", "Returns the first non-NULL value in a list.", "Concatenates two strings.", "Returns the current date and time."],
        answer: "Returns the first non-NULL value in a list.",
        explanation: "The `COALESCE` function accepts a list of arguments and returns the first argument that is not `NULL`. If all arguments are `NULL`, it returns `NULL`. It is useful for providing a default value for a column that might be null."
      },
      {
        id: 45,
        question: "What is a dangling pointer in C?",
        options: ["A pointer that has not been initialized.", "A pointer to a valid memory location.", "A pointer that points to a memory location that has been deallocated.", "Another name for a NULL pointer."],
        answer: "A pointer that points to a memory location that has been deallocated.",
        explanation: "A dangling pointer arises when a pointer continues to point to a memory address after the memory at that location has been freed (deallocated). Dereferencing a dangling pointer leads to undefined behavior."
      },
      {
        id: 46,
        question: "What is the Big O complexity for searching in a balanced Binary Search Tree (BST)?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
        answer: "O(log n)",
        explanation: "In a balanced BST, the height of the tree is proportional to log n, where n is the number of nodes. Since the search process involves traversing from the root down to a leaf, the maximum number of comparisons is the height of the tree, resulting in a time complexity of O(log n)."
      },
      {
        id: 47,
        question: "In Java, can a `private` method be overridden in a subclass?",
        options: ["Yes, but only if the subclass is in the same package.", "Yes, by using the `@Override` annotation.", "No, private methods are not inherited and cannot be overridden.", "Yes, but it will have reduced visibility."],
        answer: "No, private methods are not inherited and cannot be overridden.",
        explanation: "`private` members are not visible to subclasses, so they are not inherited. Therefore, a subclass cannot override a `private` method from its superclass. A subclass can define a method with the same signature, but this is method hiding, not overriding."
      },
      {
        id: 48,
        question: "What is the difference between `UNION` and `UNION ALL` in SQL?",
        options: ["`UNION` removes duplicate rows, while `UNION ALL` does not.", "`UNION ALL` is faster because it does not remove duplicates.", "There is no functional difference.", "Both A and B are correct."],
        answer: "Both A and B are correct.",
        explanation: "Both `UNION` and `UNION ALL` combine the result sets of two or more `SELECT` statements. The key difference is that `UNION` performs an extra step to remove any duplicate rows from the combined result set. Because `UNION ALL` skips this step, it is generally faster."
      },
      {
        id: 49,
        question: "What is the output of the following C code snippet?\n#include <stdio.h>\nint main() {\nint x = 1, y = 1, z = 1;\nif ((x-- && y++) || z++)\nprintf(\"x=%d, y=%d, z=%d\\n\", x, y, z);\nreturn 0;\n}",
        options: ["x=0, y=2, z=1", "x=0, y=2, z=2", "x=1, y=1, z=1", "x=0, y=1, z=1"],
        answer: "x=0, y=2, z=1",
        explanation: "The `&&` operator has higher precedence than `||`. The expression `x--` evaluates to 1 (true) and `x` becomes 0. Because the left side of `&&` is true, the right side `y++` is evaluated. `y++` evaluates to 1 (true) and `y` becomes 2. The result of `(x-- && y++)` is true. Because of short-circuit evaluation, the right side of the `||` operator (`z++`) is not evaluated. `z` remains 1. The `if` condition is true, and the `printf` is executed."
      },
      {
        id: 50,
        question: "Which data structure is typically used to implement a First-In, First-Out (FIFO) queue?",
        options: ["Stack", "Linked List", "Graph", "Tree"],
        answer: "Linked List",
        explanation: "A linked list is an excellent choice for implementing a queue. Enqueuing (adding an element) can be done by adding a node to the tail of the list (O(1) if a tail pointer is maintained), and dequeuing (removing an element) can be done by removing a node from the head of the list (O(1))."
      },
      {
        id: 51,
        question: "What will be the final value of `x`?\npublic class Test {\npublic static void main(String[] args) {\nint x = 10;\nx += (x >> 1);\nSystem.out.println(x);\n}\n}",
        options: ["10", "5", "15", "20"],
        answer: "15",
        explanation: "The expression `x >> 1` is a bitwise right shift. The binary of 10 is `1010`. Shifting it right by 1 bit results in `0101`, which is 5 in decimal. The statement then becomes `x = x + 5`, which is `10 + 5`, resulting in 15."
      },
      {
        id: 52,
        question: "What is the result of this SQL query, assuming `col1` can contain NULLs?\nSELECT COUNT(col1) FROM MyTable;",
        options: ["The total number of rows in `MyTable`.", "The number of non-NULL values in `col1`.", "The number of unique values in `col1`.", "The query will result in an error."],
        answer: "The number of non-NULL values in `col1`.",
        explanation: "`COUNT(<column_name>)` counts the number of rows where the specified column is not `NULL`. To count all rows in the table regardless of `NULL` values, you should use `COUNT(*)`."
      },
      {
        id: 53,
        question: "What is the output of the C code?\n#include <stdio.h>\nint main() {\nint i = 3;\nint val = i / -2 * 2;\nprintf(\"%d\\n\", val);\nreturn 0;\n}",
        options: ["-2", "-3", "2", "3"],
        answer: "-2",
        explanation: "In C, integer division truncates towards zero. `i / -2` (i.e., `3 / -2`) results in -1. Then, `-1 * 2` results in -2. The expression is evaluated according to operator precedence, where `/` and `*` have the same precedence and are evaluated left-to-right."
      },
      {
        id: 54,
        question: "In C++, if a class `D` inherits from class `B`, and an object of `D` is created, which constructor is called first?",
        options: ["The constructor of class `D`.", "The constructor of class `B`.", "It depends on the order of declaration.", "They are called simultaneously."],
        answer: "The constructor of class `B`.",
        explanation: "When creating an object of a derived class, the base class constructor is always called first. This ensures that the base part of the object is properly initialized before the derived part is constructed."
      },
      {
        id: 55,
        question: "In Java, what happens if a thread calls the `wait()` method?",
        options: ["The thread continues execution after a short pause.", "The thread releases the lock it holds and goes into a waiting state.", "The thread is terminated.", "The thread enters a busy-waiting loop."],
        answer: "The thread releases the lock it holds and goes into a waiting state.",
        explanation: "A thread must own the monitor (lock) of an object to call `wait()` on it. When `wait()` is called, the thread releases the lock and becomes inactive. It can be woken up by another thread calling `notify()` or `notifyAll()` on the same object."
      },
      {
        id: 56,
        question: "What does `ACID` stand for in the context of database transactions?",
        options: ["Atomicity, Consistency, Isolation, Durability", "Association, Concurrency, Integrity, Durability", "Atomicity, Concurrency, Isolation, Datagrams", "Availability, Consistency, Integrity, Durability"],
        answer: "Atomicity, Consistency, Isolation, Durability",
        explanation: "ACID is a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps. Atomicity (all or nothing), Consistency (brings DB from one valid state to another), Isolation (concurrent transactions don't affect each other), and Durability (committed changes are permanent)."
      },
      {
        id: 57,
        question: "Which data structure is most suitable for implementing a spell checker?",
        options: ["Queue", "Stack", "Trie (Prefix Tree)", "Linked List"],
        answer: "Trie (Prefix Tree)",
        explanation: "A Trie is an efficient tree-based data structure for storing strings. It is ideal for spell checkers and auto-complete features because it allows for very fast prefix searches. You can quickly check if a word is in the dictionary or find all words with a given prefix."
      },
      {
        id: 58,
        question: "What is the output of this C++ snippet?\n#include <iostream>\nint main() {\nbool a = true;\nbool b = false;\nint x = 10, y = 5;\nint result = a * x + b * y;\nstd::cout << result << std::endl;\nreturn 0;\n}",
        options: ["15", "5", "10", "Compiler Error"],
        answer: "10",
        explanation: "In C++, when boolean values are used in an arithmetic context, `true` is converted to the integer `1` and `false` is converted to the integer `0`. Therefore, the expression becomes `1 * 10 + 0 * 5`, which evaluates to `10`."
      },
      {
        id: 59,
        question: "What does the `static` keyword mean when applied to a method in Java?",
        options: ["The method can only be called from within the same class.", "The method belongs to the class itself, not to any specific instance.", "The method cannot be changed.", "The method will be loaded into memory only once."],
        answer: "The method belongs to the class itself, not to any specific instance.",
        explanation: "A static method, also known as a class method, can be called without creating an instance of the class. It is associated with the class, not with any object. It cannot use non-static instance variables or methods directly."
      },
      {
        id: 60,
        question: "Which sorting algorithm has a worst-case time complexity of O(n^2) but an average-case time complexity of O(n log n)?",
        options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Quick Sort"],
        answer: "Quick Sort",
        explanation: "Quick Sort's performance is highly dependent on the choice of the pivot element. In the average case, it performs very well at O(n log n). However, in the worst case (e.g., when the array is already sorted and the pivot is chosen as the first or last element), it degrades to O(n^2). Merge Sort is O(n log n) in all cases, while Bubble and Insertion Sort are O(n^2) in the average and worst cases."
      }
    ]
  },
  {
    paperId: "tech-paper3",
    name: "Technical Paper 3 - Advanced Programming Concepts",
    duration: 60, // minutes
    totalQuestions: 60,
    questions: [
      {
        id: 1,
        question: "What is the output of the following C code?\n#include <stdio.h>\nint main() {\n int i = 0;\n for (i = 0; i < 5; i++);\n printf(\"%d\", i);\n return 0;\n}",
        options: ["4", "5", "0", "Compilation Error"],
        answer: "5",
        explanation: "The semicolon after the for loop `for (i = 0; i < 5; i++);` makes the loop an empty loop. The loop runs 5 times, incrementing `i` from 0 to 4. On the last check, `i` becomes 5, the condition `5 < 5` is false, and the loop terminates. The following `printf` statement then prints the final value of `i`, which is 5."
      },
      {
        id: 2,
        question: "What is the output of the following C++ code?\n#include <iostream>\nclass Test {\npublic:\n Test() { std::cout << \"Constructor Called\\n\"; }\n ~Test() { std::cout << \"Destructor Called\\n\"; }\n};\nint main() {\n Test *t = (Test*)malloc(sizeof(Test));\n free(t);\n return 0;\n}",
        options: ["Constructor Called\nDestructor Called", "Constructor Called", "Destructor Called", "No output"],
        answer: "No output",
        explanation: "`malloc` only allocates raw memory; it does not call the constructor of the class. Similarly, `free` only deallocates the memory; it does not call the destructor. To properly construct and destruct the object, `new` and `delete` should be used."
      },
      {
        id: 3,
        question: "What is the result of the following Java code snippet?\npublic class Main {\n public static void main(String[] args) {\n String s1 = \"Java\";\n String s2 = \"Java\";\n s1.replace('J', 'L');\n System.out.println(s1 == s2);\n }\n}",
        options: ["true", "false", "Compilation Error", "Throws Exception"],
        answer: "true",
        explanation: "Both `s1` and `s2` refer to the same string literal \"Java\" in the string pool. The `replace()` method in Java returns a new string and does not modify the original string because strings are immutable. Since `s1` is not reassigned, it still points to the original \"Java\" object. Therefore, `s1 == s2` is true."
      },
      {
        id: 4,
        question: "Which of the following SQL statements will result in an error?",
        options: ["SELECT * FROM Employees WHERE Salary > 50000;", "SELECT Department, COUNT(*) FROM Employees GROUP BY Department;", "SELECT Department, COUNT(*) FROM Employees WHERE COUNT(*) > 10 GROUP BY Department;", "SELECT Department, COUNT(*) FROM Employees GROUP BY Department HAVING COUNT(*) > 10;"],
        answer: "SELECT Department, COUNT(*) FROM Employees WHERE COUNT(*) > 10 GROUP BY Department;",
        explanation: "Aggregate functions like `COUNT(*)` cannot be used in a `WHERE` clause. The `WHERE` clause filters rows before any grouping occurs. To filter groups based on an aggregate function, the `HAVING` clause must be used after the `GROUP BY` clause."
      },
      {
        id: 5,
        question: "What is the time complexity to find an element in a balanced Binary Search Tree (BST) with n nodes?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
        answer: "O(log n)",
        explanation: "In a balanced Binary Search Tree, the height of the tree is O(log n). Since the search operation proceeds from the root to a leaf, the maximum number of comparisons is proportional to the height of the tree, resulting in a time complexity of O(log n)."
      },
      {
        id: 6,
        question: "Predict the output of this C program.\n#include <stdio.h>\nint main() {\n float f = 0.5;\n if (f == 0.5f) {\n printf(\"Equal\");\n } else {\n printf(\"Not Equal\");\n }\n return 0;\n}",
        options: ["Equal", "Not Equal", "Undefined Behavior", "Compilation Error"],
        answer: "Equal",
        explanation: "By default, a floating-point literal like `0.5` is treated as a `double`. The variable `f` is a `float`. Comparing a `float` with a `double` can lead to precision issues. However, by using the suffix `f` (i.e., `0.5f`), we specify that the literal is a `float`, ensuring the comparison is between two values of the same type and precision, which results in \"Equal\"."
      },
      {
        id: 7,
        question: "What does the following C++ code print?\n#include <iostream>\nint main() {\n int arr[] = {10, 20, 30};\n int &ref = arr[0];\n ref++;\n std::cout << arr[0] << std::endl;\n return 0;\n}",
        options: ["10", "11", "Garbage Value", "Compilation Error"],
        answer: "11",
        explanation: "A reference `ref` is created for the first element of the array `arr[0]`. When `ref` is incremented, it modifies the value it refers to, which is `arr[0]`. So, `arr[0]` becomes 11."
      },
      {
        id: 8,
        question: "What happens when this Java code is executed?\npublic class Main {\n public static void main(String[] args) {\n final StringBuilder sb = new StringBuilder(\"Hello\");\n sb.append(\" World\");\n System.out.println(sb);\n }\n}",
        options: ["Hello", "Hello World", "Compilation Error", "Throws Exception"],
        answer: "Hello World",
        explanation: "The `final` keyword, when applied to an object reference like `sb`, means that the reference variable cannot be reassigned to point to another object. However, the state of the object itself can be modified. `StringBuilder` is mutable, so `append(\" World\")` modifies the object's content."
      },
      {
        id: 9,
        question: "What will be the result of this SQL query?\nSELECT CASE WHEN NULL = NULL THEN 'True' ELSE 'False' END;",
        options: ["True", "False", "NULL", "Error"],
        answer: "False",
        explanation: "In SQL, comparing `NULL` with `NULL` using the `=` operator results in `UNKNOWN`, which is treated as `false` in a `CASE` statement's `WHEN` condition. To check for `NULL`, you must use the `IS NULL` operator."
      },
      {
        id: 10,
        question: "Which data structure is most suitable for implementing a \"Undo\" feature in a text editor?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        answer: "Stack",
        explanation: "An \"Undo\" feature requires actions to be reversed in the opposite order they were performed. A Stack follows the Last-In, First-Out (LIFO) principle, which is the exact behavior needed. The most recent action is pushed onto the stack, and \"Undo\" pops it off."
      },
      {
        id: 11,
        question: "What is the value of `x` after this C code runs?\n#include <stdio.h>\nint main() {\n int x = 10;\n x = x << 2;\n printf(\"%d\", x);\n return 0;\n}",
        options: ["20", "40", "5", "2"],
        answer: "40",
        explanation: "The `<<` is the left bitwise shift operator. `x << 2` shifts the bits of `x` two places to the left. The binary representation of 10 is `00001010`. Shifting left by 2 results in `00101000`, which is the decimal number 40. Left shifting by `n` is equivalent to multiplying by `2^n`."
      },
      {
        id: 12,
        question: "What is the output of the C++ code below?\n#include <iostream>\nclass Base {\npublic:\n virtual void show() { std::cout << \"Base\\n\"; }\n};\nclass Derived : public Base {\npublic:\n void show() { std::cout << \"Derived\\n\"; }\n};\nint main() {\n Base b;\n Derived d;\n Base *ptr = &b;\n ptr->show();\n ptr = &d;\n ptr->show();\n return 0;\n}",
        options: ["Base\nBase", "Derived\nDerived", "Base\nDerived", "Derived\nBase"],
        answer: "Base\nDerived",
        explanation: "This demonstrates runtime polymorphism. When `ptr` points to a `Base` object, `Base::show()` is called. When `ptr` points to a `Derived` object, the `virtual` keyword ensures that the overridden `Derived::show()` method is called through the base class pointer."
      },
      {
        id: 13,
        question: "What is printed by this Java code?\nimport java.util.ArrayList;\nimport java.util.List;\npublic class Main {\n public static void main(String[] args) {\n List<String> list = new ArrayList<>();\n list.add(\"A\");\n list.add(1, \"B\");\n list.set(0, \"C\");\n System.out.println(list);\n }\n}",
        options: ["[A, B]", "[C, B]", "[C, A]", "[A, C]"],
        answer: "[C, B]",
        explanation: "`list.add(\"A\")` adds \"A\" at index 0. The list is `[A]`. `list.add(1, \"B\")` adds \"B\" at index 1. The list becomes `[A, B]`. `list.set(0, \"C\")` replaces the element at index 0 with \"C\". The final list is `[C, B]`."
      },
      {
        id: 14,
        question: "What does the following SQL query do?\nDELETE FROM Products;",
        options: ["Deletes the `Products` table.", "Deletes all rows from the `Products` table.", "Deletes all columns from the `Products` table.", "This query is invalid."],
        answer: "Deletes all rows from the `Products` table.",
        explanation: "The `DELETE FROM table_name` command without a `WHERE` clause removes all rows from the specified table. The table structure itself remains. This operation can typically be rolled back."
      },
      {
        id: 15,
        question: "In a circular queue implemented with an array of size N, how is the front pointer advanced?",
        options: ["front = front + 1;", "front = (front + 1) % N;", "front = front - 1;", "front = (front - 1 + N) % N;"],
        answer: "front = (front + 1) % N;",
        explanation: "In a circular queue, the pointers wrap around to the beginning of the array when they reach the end. The modulo operator (`%`) is used to achieve this circular behavior. `(front + 1) % N` correctly advances the pointer and wraps it around if it reaches `N`."
      },
      {
        id: 16,
        question: "What is the output of this C code involving the preprocessor?\n#include <stdio.h>\n#define MERGE(a, b) a##b\nint main() {\n int xy = 100;\n printf(\"%d\\n\", MERGE(x, y));\n return 0;\n}",
        options: ["xy", "100", "0", "Compilation Error"],
        answer: "100",
        explanation: "The `##` operator in a C preprocessor macro is the token-pasting operator. It concatenates the two tokens `a` and `b`. So, `MERGE(x, y)` becomes `xy`. The program then prints the value of the integer variable `xy`, which is 100."
      },
      {
        id: 17,
        question: "What is the concept demonstrated by the following C++ code?\n#include <iostream>\nclass Point {\nprivate:\n int x, y;\npublic:\n Point(int x1, int y1) { x = x1; y = y1; }\n Point operator+(const Point &p) {\n return Point(x + p.x, y + p.y);\n }\n void print() { std::cout << x << \" \" << y << std::endl; }\n};\nint main() {\n Point p1(10, 20), p2(5, 15);\n Point p3 = p1 + p2;\n p3.print();\n return 0;\n}",
        options: ["Function Overloading", "Operator Overloading", "Function Overriding", "Inheritance"],
        answer: "Operator Overloading",
        explanation: "The code defines a custom behavior for the `+` operator for the `Point` class. This allows objects of the `Point` class to be added together using the `+` symbol, which is a classic example of operator overloading."
      },
      {
        id: 18,
        question: "Predict the output of the Java code.\npublic class Main {\n public static void main(String[] args) {\n try {\n System.out.print(\"A\");\n int value = 5 / 0;\n System.out.print(\"B\");\n } catch (Exception e) {\n System.out.print(\"C\");\n } finally {\n System.out.print(\"D\");\n }\n System.out.print(\"E\");\n }\n}",
        options: ["ACDE", "ABCDE", "AD", "ACD"],
        answer: "ACDE",
        explanation: "\"A\" is printed. Then, `5 / 0` throws an `ArithmeticException`. The `catch` block catches this exception, and \"C\" is printed. The `finally` block is always executed, so \"D\" is printed. The program then continues execution after the try-catch-finally block, and \"E\" is printed."
      },
      {
        id: 19,
        question: "Given a table `Students` with columns `StudentID` and `Score`, which query finds the second highest score?",
        options: ["SELECT MAX(Score) FROM Students WHERE Score < (SELECT MAX(Score) FROM Students);", "SELECT Score FROM Students ORDER BY Score DESC LIMIT 1, 1;", "SELECT MAX(Score) FROM Students WHERE Score NOT IN (SELECT MAX(Score) FROM Students);", "All of the above could work depending on the SQL dialect."],
        answer: "All of the above could work depending on the SQL dialect.",
        explanation: "A uses a subquery to exclude the highest score and find the max of the rest. C is similar to A. B uses `LIMIT` with an offset, which works in MySQL and PostgreSQL but not in all SQL versions (e.g., SQL Server would use `OFFSET FETCH`). All three approaches are valid ways to find the second highest value."
      },
      {
        id: 20,
        question: "What is a key difference between a graph and a tree?",
        options: ["Graphs can have cycles, while trees cannot.", "Trees can have cycles, while graphs cannot.", "Graphs are always connected, while trees are not.", "Trees must have a root, while graphs do not."],
        answer: "Graphs can have cycles, while trees cannot.",
        explanation: "A tree is a specific type of connected, acyclic graph. The defining characteristic that separates a general graph from a tree is that a tree must not contain any cycles."
      },
      {
        id: 21,
        question: "What is the output of this C code snippet?\n#include <stdio.h>\nint main() {\n const int val = 10;\n int *ptr = (int*) &val;\n *ptr = 20;\n printf(\"%d\", val);\n return 0;\n}",
        options: ["10", "20", "Compilation Error", "Undefined Behavior"],
        answer: "Undefined Behavior",
        explanation: "Attempting to modify a `const` qualified variable through a pointer results in undefined behavior. The compiler might place `val` in a read-only memory segment. While the code may compile (with a warning), its runtime behavior is not guaranteed by the C standard. It might print 10, 20, or crash."
      },
      {
        id: 22,
        question: "What is a friend function in C++?",
        options: ["A function that can access private members of any class.", "A member function of a class that is accessible from outside the class.", "A non-member function that is granted access to the private and protected members of a class.", "A function that is inherited by a derived class."],
        answer: "A non-member function that is granted access to the private and protected members of a class.",
        explanation: "A class can declare a function as its \"friend\". This gives the friend function access to the class's private and protected members, even though the function is not a member of the class itself."
      },
      {
        id: 23,
        question: "What is the state of a thread when it is waiting for another thread to complete its task?",
        options: ["RUNNABLE", "BLOCKED", "WAITING", "TIMED_WAITING"],
        answer: "WAITING",
        explanation: "A thread enters the `WAITING` state when it calls a method like `Object.wait()` without a timeout or `Thread.join()` without a timeout. It is waiting indefinitely for another thread to perform a particular action, such as calling `notify()` or terminating."
      },
      {
        id: 24,
        question: "What is the primary purpose of the SQL `UNION` operator?",
        options: ["To join columns from two different tables.", "To combine the result sets of two or more SELECT statements.", "To create a new table from existing tables.", "To filter duplicate rows from a single query."],
        answer: "To combine the result sets of two or more SELECT statements.",
        explanation: "The `UNION` operator is used to append the results of two queries. It combines the rows from both queries into a single result set. By default, `UNION` removes duplicate rows from the combined result."
      },
      {
        id: 25,
        question: "What is the worst-case time complexity for searching, inserting, and deleting in a general Binary Tree?",
        options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
        answer: "O(n)",
        explanation: "In the worst case, a binary tree can be skewed, resembling a linked list. In such a scenario, the height of the tree is `n`, and operations that depend on the height, like search, insertion, and deletion, will have a time complexity of O(n)."
      },
      {
        id: 26,
        question: "What is printed by the following C program?\n#include <stdio.h>\nunion Data {\n int i;\n char c;\n};\nint main() {\n union Data d;\n d.i = 65;\n printf(\"c = %c\\n\", d.c);\n return 0;\n}",
        options: ["c = A", "c = 65", "c = (some garbage value)", "Compilation Error"],
        answer: "c = A",
        explanation: "In a union, all members share the same memory location. The integer value 65 is stored in `d.i`. The ASCII representation of 65 is the character 'A'. When `d.c` is accessed, the byte at that memory location is interpreted as a character, which is 'A'."
      },
      {
        id: 27,
        question: "Which C++ feature allows a derived class to provide a specific implementation of a method that is already provided by its base class?",
        options: ["Abstraction", "Function Overloading", "Method Overriding", "Encapsulation"],
        answer: "Method Overriding",
        explanation: "Method overriding is a feature of inheritance where a subclass provides a different implementation for a method that is defined in its superclass. This is a key part of runtime polymorphism."
      },
      {
        id: 28,
        question: "In Java, what is the role of the Garbage Collector?",
        options: ["To manually deallocate memory for objects.", "To automatically manage the lifecycle of threads.", "To automatically identify and reclaim memory from objects that are no longer reachable.", "To collect and report runtime exceptions."],
        answer: "To automatically identify and reclaim memory from objects that are no longer reachable.",
        explanation: "The Garbage Collector (GC) is a form of automatic memory management. It runs in the background, tracking objects in the heap and freeing up memory occupied by objects that are no longer in use by the program."
      },
      {
        id: 29,
        question: "What is the difference between a Primary Key and a Unique Key constraint in SQL?",
        options: ["A table can have multiple Primary Keys, but only one Unique Key.", "A Primary Key cannot contain NULL values, whereas a Unique Key can.", "A Unique Key cannot contain NULL values, whereas a Primary Key can.", "There is no difference."],
        answer: "A Primary Key cannot contain NULL values, whereas a Unique Key can.",
        explanation: "Both constraints ensure that the values in a column (or a set of columns) are unique. However, a Primary Key is stricter: it does not allow NULL values, and a table can have only one Primary Key. A Unique Key constraint allows one NULL value (in most database systems)."
      },
      {
        id: 30,
        question: "Which sorting algorithm is considered stable?",
        options: ["Quicksort", "Heapsort", "Selection Sort", "Merge Sort"],
        answer: "Merge Sort",
        explanation: "A sorting algorithm is stable if it preserves the relative order of equal elements. Merge Sort is a stable sorting algorithm. Quicksort and Heapsort are not stable. Selection Sort is generally not stable."
      },
      {
        id: 31,
        question: "What is a dangling pointer in C?",
        options: ["A pointer that has not been initialized.", "A pointer that points to a memory location that has been deallocated (freed).", "A pointer that is explicitly set to NULL.", "A pointer to a pointer."],
        answer: "A pointer that points to a memory location that has been deallocated (freed).",
        explanation: "A dangling pointer arises when a pointer continues to refer to a memory address after the memory has been freed. Accessing a dangling pointer leads to undefined behavior."
      },
      {
        id: 32,
        question: "What is the output of the following C++ program?\n#include <iostream>\nstruct A {\n int i;\n A(int i) : i(i) {}\n ~A() { std::cout << \"Destruct \" << i << std::endl; }\n};\nint main() {\n A a1(1);\n A a2(2);\n return 0;\n}",
        options: ["Destruct 1\nDestruct 2", "Destruct 2\nDestruct 1", "No output", "Undefined Behavior"],
        answer: "Destruct 2\nDestruct 1",
        explanation: "Objects created on the stack are destructed in the reverse order of their creation when they go out of scope. `a1` is created first, then `a2`. When `main` exits, `a2` is destructed first, followed by `a1`."
      },
      {
        id: 33,
        question: "Which collection class in Java does not allow duplicate elements?",
        options: ["ArrayList", "LinkedList", "HashSet", "HashMap"],
        answer: "HashSet",
        explanation: "`HashSet` is an implementation of the `Set` interface. A key property of a Set is that it does not store duplicate elements. If you try to add an element that already exists in the `HashSet`, the add operation will be ignored."
      },
      {
        id: 34,
        question: "What does `LEFT JOIN` do in SQL?",
        options: ["Returns all records from the right table, and the matched records from the left table.", "Returns records that have matching values in both tables.", "Returns all records from the left table, and the matched records from the right table.", "Returns all records when there is a match in either left or right table."],
        answer: "Returns all records from the left table, and the matched records from the right table.",
        explanation: "A `LEFT JOIN` (or `LEFT OUTER JOIN`) returns all rows from the left table, along with the matching rows from the right table. If there is no match in the right table, the result is `NULL` for the columns from the right table."
      },
      {
        id: 35,
        question: "What is the data structure used to manage function calls and recursion?",
        options: ["Queue", "Heap", "Stack", "Array"],
        answer: "Stack",
        explanation: "The call stack is a stack data structure that stores information about the active subroutines (functions) of a computer program. Each time a function is called, a new frame is pushed onto the stack, and when the function returns, its frame is popped off."
      },
      {
        id: 36,
        question: "What will be the value of `c`?\n#include <stdio.h>\nint main() {\n int a = 5, b = 3;\n int c = a & b;\n printf(\"%d\", c);\n return 0;\n}",
        options: ["1", "2", "5", "7"],
        answer: "1",
        explanation: "The `&` is the bitwise AND operator. The binary representation of 5 is `0101` and for 3 is `0011`. Performing a bitwise AND operation: `0101 & 0011 = 0001`, which is the decimal number 1."
      },
      {
        id: 37,
        question: "Which OOPS concept is best represented by a real-world example of a car, which hides its internal complexity (engine, transmission) from the driver?",
        options: ["Inheritance", "Polymorphism", "Encapsulation/Abstraction", "Overloading"],
        answer: "Encapsulation/Abstraction",
        explanation: "Encapsulation is the bundling of data with the methods that operate on that data. Abstraction is the concept of hiding the complex reality while exposing only the necessary parts. A driver interacts with a car through a simple interface (steering wheel, pedals) without needing to know the complex internal mechanics, which is a perfect example of abstraction."
      },
      {
        id: 38,
        question: "What is the purpose of an assertion in Java?",
        options: ["To handle runtime errors gracefully.", "To define a condition that must be true at a particular point in the code.", "To replace a standard `if-else` statement.", "To manage memory allocation."],
        answer: "To define a condition that must be true at a particular point in the code.",
        explanation: "Assertions are used for debugging purposes. An assertion is a statement that checks a condition which is expected to be true. If the condition is false, an `AssertionError` is thrown, which typically halts the program, indicating a bug. Assertions must be explicitly enabled at runtime."
      },
      {
        id: 39,
        question: "What is the main difference between `TRUNCATE` and `DELETE` in SQL?",
        options: ["`TRUNCATE` is faster and uses fewer system resources than `DELETE`.", "`TRUNCATE` is a DDL command, while `DELETE` is a DML command.", "`TRUNCATE` resets identity columns, while `DELETE` does not.", "All of the above."],
        answer: "All of the above.",
        explanation: "`TRUNCATE` is a Data Definition Language (DDL) command that quickly removes all rows from a table, often by deallocating the data pages. It cannot be rolled back easily, resets identity counters, and doesn't fire delete triggers. `DELETE` is a Data Manipulation Language (DML) command that removes rows one by one, can be rolled back, and fires triggers."
      },
      {
        id: 40,
        question: "What is the height of a complete binary tree with `n` nodes?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
        answer: "O(log n)",
        explanation: "A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. This structure ensures that the height of the tree is logarithmic with respect to the number of nodes, specifically `floor(log2(n))`."
      },
      {
        id: 41,
        question: "What is the output of the following C code?\n#include <stdio.h>\n#include <string.h>\nint main() {\n char str[10] = \"Hello\";\n printf(\"%zu %zu\\n\", sizeof(str), strlen(str));\n return 0;\n}",
        options: ["5 5", "10 5", "6 5", "10 6"],
        answer: "10 5",
        explanation: "`sizeof(str)` returns the total size of the array `str` in bytes, which was declared to be 10. `strlen(str)` returns the length of the C-string, which is the number of characters before the null terminator (`\\0`). The string \"Hello\" has 5 characters."
      },
      {
        id: 42,
        question: "In C++, if a class `D` inherits from class `B`, and an object of class `D` is created, which constructor is called first?",
        options: ["The constructor of the derived class `D`.", "The constructor of the base class `B`.", "It depends on the order of declaration.", "Both are called simultaneously."],
        answer: "The constructor of the base class `B`.",
        explanation: "During the construction of a derived class object, the base class constructor is always called before the derived class constructor. This ensures that the base part of the object is properly initialized before the derived part is constructed."
      },
      {
        id: 43,
        question: "What does `java.lang.Object` class represent in Java?",
        options: ["It is the root class for all custom exception types.", "It is a utility class for mathematical operations.", "It is the root of the class hierarchy; every class is a descendant of `Object`.", "It is a class used to create instances of other classes."],
        answer: "It is the root of the class hierarchy; every class is a descendant of `Object`.",
        explanation: "In Java, every class, whether explicitly declared or not, inherits from the `java.lang.Object` class. This makes it the ultimate superclass of all classes and ensures that every object has a common set of methods like `equals()`, `hashCode()`, and `toString()`."
      },
      {
        id: 44,
        question: "Which constraint ensures that all values in a column are different from each other and also prevents NULL values?",
        options: ["UNIQUE", "NOT NULL", "CHECK", "PRIMARY KEY"],
        answer: "PRIMARY KEY",
        explanation: "A `PRIMARY KEY` is a combination of a `UNIQUE` constraint and a `NOT NULL` constraint. It uniquely identifies each record in a table and does not allow any `NULL` values."
      },
      {
        id: 45,
        question: "Which of the following data structures provides the fastest access to an element given its index?",
        options: ["Singly Linked List", "Doubly Linked List", "Array", "Queue"],
        answer: "Array",
        explanation: "An array stores elements in contiguous memory locations. This allows for direct calculation of an element's memory address based on its index, providing O(1) or constant time access. Linked lists require traversing from the head of the list, which takes O(n) time."
      },
      {
        id: 46,
        question: "What does this C declaration mean: `int (*fp)(char*);`?",
        options: ["A function `fp` that takes a `char*` and returns an `int*`.", "A pointer to a function that takes a `char*` and returns an `int`.", "A function `fp` that takes an `int` and returns a `char*`.", "An array of pointers to functions."],
        answer: "A pointer to a function that takes a `char*` and returns an `int`.",
        explanation: "The parentheses around `*fp` give the pointer operator `*` precedence over the function call operator `()`. This means `fp` is a pointer. It points to a function that takes a `char*` as an argument and returns an `int`."
      },
      {
        id: 47,
        question: "In C++, what happens if a class has a pointer to dynamically allocated memory but does not have a user-defined copy constructor?",
        options: ["The code will not compile.", "A shallow copy will be performed by the default copy constructor.", "A deep copy will be performed by the default copy constructor.", "A runtime error will always occur."],
        answer: "A shallow copy will be performed by the default copy constructor.",
        explanation: "If a copy constructor is not provided, the compiler generates a default one that performs a member-wise copy (a shallow copy). If the class contains a pointer, only the pointer's address is copied, not the data it points to. This leads to two objects pointing to the same memory, which can cause issues like double-free errors."
      },
      {
        id: 48,
        question: "Which of these is a checked exception in Java?",
        options: ["`NullPointerException`", "`ArrayIndexOutOfBoundsException`", "`IOException`", "`ArithmeticException`"],
        answer: "`IOException`",
        explanation: "Checked exceptions are exceptions that are checked at compile-time. Methods that can throw a checked exception must either handle it using a try-catch block or declare it in the method signature using the `throws` keyword. `IOException` is a classic example. The others are unchecked (runtime) exceptions."
      },
      {
        id: 49,
        question: "What is an SQL injection?",
        options: ["A database performance tuning technique.", "A code injection technique that might destroy your database.", "A method for adding new data to a table.", "A type of database join."],
        answer: "A code injection technique that might destroy your database.",
        explanation: "SQL injection is a security vulnerability where an attacker can interfere with the queries that an application makes to its database. It allows an attacker to view data they are not normally able to retrieve or even modify or delete data, causing persistent changes to the application's content or behavior."
      },
      {
        id: 50,
        question: "What is the main advantage of a doubly linked list over a singly linked list?",
        options: ["It uses less memory.", "It can be traversed in both forward and reverse directions.", "Insertion and deletion are faster.", "It allows for direct access to any element."],
        answer: "It can be traversed in both forward and reverse directions.",
        explanation: "A doubly linked list contains an extra pointer in each node, known as the previous pointer, which points to the preceding node. This additional pointer allows for traversal in both directions, which can simplify certain operations like deletion of a specific node."
      },
      {
        id: 51,
        question: "What is the purpose of the `typedef` keyword in C?",
        options: ["To create a new variable of a certain type.", "To define a new data type from scratch.", "To create an alias or a new name for an existing data type.", "To check the type of a variable at runtime."],
        answer: "To create an alias or a new name for an existing data type.",
        explanation: "`typedef` is used to give a new name to an existing data type. This is often used to make complex type declarations more readable, for example, `typedef unsigned char BYTE;`."
      },
      {
        id: 52,
        question: "Which statement is true about exception handling in C++?",
        options: ["Exceptions must be of primitive types like `int` or `char`.", "A `try` block must be followed by exactly one `catch` block.", "Any type of object, including user-defined classes, can be thrown as an exception.", "The `finally` keyword is used to ensure code is always executed."],
        answer: "Any type of object, including user-defined classes, can be thrown as an exception.",
        explanation: "In C++, you can throw a value of any type as an exception, including integers, strings, or objects of user-defined classes. A `try` block can be followed by multiple `catch` blocks to handle different exception types. C++ does not have a `finally` keyword like Java; resource management is typically handled using RAII (Resource Acquisition Is Initialization)."
      },
      {
        id: 53,
        question: "What will be the output of this Java program?\npublic class Main {\n public static void main(String args[]) {\n System.out.println(10 + 20 + \"Java\");\n System.out.println(\"Java\" + 10 + 20);\n }\n}",
        options: ["30Java\nJava30", "30Java\nJava1020", "1020Java\nJava1020", "1020Java\nJava30"],
        answer: "30Java\nJava1020",
        explanation: "In the first `println`, `10 + 20` is evaluated first as integer addition, resulting in `30`. Then, `30` is concatenated with the string \"Java\". In the second `println`, evaluation proceeds from left to right. \"Java\" + 10 results in the string \"Java10\", which is then concatenated with 20 to produce \"Java1020\"."
      },
      {
        id: 54,
        question: "If a table has a column `OrderDate` of type `DATE`, which SQL clause would you use to select orders placed in the last 7 days?",
        options: ["WHERE OrderDate >= NOW() - INTERVAL '7' DAY", "WHERE OrderDate > 7", "HAVING OrderDate > GETDATE() - 7", "WHERE OrderDate IN (LAST 7 DAYS)"],
        answer: "WHERE OrderDate >= NOW() - INTERVAL '7' DAY",
        explanation: "The syntax for date functions varies between SQL dialects (e.g., `GETDATE()` in SQL Server, `NOW()` in MySQL/PostgreSQL). However, the general approach is to compare the `OrderDate` column to the current date minus a 7-day interval. Option A represents this common pattern."
      },
      {
        id: 55,
        question: "In the context of algorithms, what does \"Big O\" notation represent?",
        options: ["The exact number of operations an algorithm will perform.", "The average-case performance of an algorithm.", "The worst-case time complexity or upper bound of an algorithm's growth rate.", "The best-case performance of an algorithm."],
        answer: "The worst-case time complexity or upper bound of an algorithm's growth rate.",
        explanation: "Big O notation is used to classify algorithms according to how their run time or space requirements grow as the input size grows. It describes the upper bound on the growth rate, effectively representing the worst-case scenario."
      },
      {
        id: 56,
        question: "What is the output of the C code below?\n#include <stdio.h>\nvoid func(char **ptr) {\n *ptr = \"World\";\n}\nint main() {\n char *str = \"Hello\";\n func(&str);\n printf(\"%s\", str);\n return 0;\n}",
        options: ["Hello", "World", "Compilation Error", "Garbage Value"],
        answer: "World",
        explanation: "The function `func` takes a pointer to a character pointer (`char **`). Inside `main`, the address of the pointer `str` is passed to `func`. The function then modifies the pointer `str` itself to point to the string literal \"World\". The `printf` in `main` then prints the new string `str` points to."
      },
      {
        id: 57,
        question: "In C++, if you have a class without any constructors defined, what happens when you create an object?",
        options: ["The code fails to compile.", "The object is created without any member initialization.", "A default constructor is automatically provided by the compiler.", "A runtime error occurs."],
        answer: "A default constructor is automatically provided by the compiler.",
        explanation: "If a class has no user-declared constructors, the compiler will declare a default constructor as an `inline public` member of its class. This constructor will have no arguments and an empty body."
      },
      {
        id: 58,
        question: "What is the primary use of an `Inner Class` in Java?",
        options: ["To create multiple instances of a class within another class.", "To logically group classes and interfaces in one place so that it can be more readable and maintainable.", "To improve the performance of a program.", "To allow a class to inherit from multiple classes."],
        answer: "To logically group classes and interfaces in one place so that it can be more readable and maintainable.",
        explanation: "Inner classes are a way of logically grouping classes that are only used in one place. It increases encapsulation, and an inner class has access to the members of its enclosing outer class, which can lead to more readable and maintainable code."
      },
      {
        id: 59,
        question: "Which type of SQL join would you use to return all customers, and the orders they might have placed? (Including customers who have not placed any orders).",
        options: ["INNER JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "LEFT JOIN"],
        answer: "LEFT JOIN",
        explanation: "Assuming `Customers` is the left table and `Orders` is the right table, a `LEFT JOIN` will return all rows from the `Customers` table, regardless of whether there is a match in the `Orders` table. For customers with no orders, the columns from the `Orders` table will be `NULL`."
      },
      {
        id: 60,
        question: "What is a hash collision?",
        options: ["When two different hash functions produce the same output for the same key.", "When a hash function produces the same output for two different keys.", "When a hash table runs out of memory.", "When a key cannot be hashed."],
        answer: "When a hash function produces the same output for two different keys.",
        explanation: "A hash collision occurs when the hash function maps two distinct input keys to the same output hash value. Since hash tables use this value as an index, collision resolution techniques (like chaining or open addressing) are needed to handle such cases."
      }
    ]
  },
  {
    paperId: "tech-paper4",
    name: "Technical Paper 4 - Advanced Programming Concepts",
    duration: 60, // minutes
    totalQuestions: 60,
    questions: [
      {
        id: 1,
        question: "What is the output if the C program is executed with the command line: `./a.out one two`?\n#include <stdio.h>\nint main(int argc, char *argv[]) {\n printf(\"%c\", *++argv[1]);\n return 0;\n}",
        options: ["o", "n", "e", "Compilation Error"],
        answer: "o",
        explanation: "`argv[1]` is a pointer to the string \"one\". `++argv[1]` increments this pointer, so it now points to the second character of the string, which is 'o'. The `*` dereferences this pointer, yielding the character 'o'."
      },
      {
        id: 2,
        question: "What is the output of the following C++ code?\n#include <iostream>\nclass Entity {\npublic:\n int x;\n void print() {\n std::cout << this->x << std::endl;\n }\n};\nint main() {\n Entity e;\n e.x = 5;\n Entity *ptr = &e;\n ptr->x = 10;\n ptr->print();\n return 0;\n}",
        options: ["5", "10", "Garbage Value", "Compilation Error"],
        answer: "10",
        explanation: "The `this` pointer in a member function points to the specific object instance on which the function was called. Here, `ptr` points to object `e`. `ptr->x = 10` modifies the member `x` of `e`. When `ptr->print()` is called, `this->x` inside the `print` function refers to `e.x`, which is now 10."
      },
      {
        id: 3,
        question: "What is a potential issue with the following Java class if used in a HashSet?\nimport java.util.Objects;\npublic class Employee {\n private long id;\n private String name;\n // constructor, getters, setters\n @Override\n public boolean equals(Object o) {\n if (this == o) return true;\n if (o == null || getClass() != o.getClass()) return false;\n Employee employee = (Employee) o;\n return id == employee.id;\n }\n // No hashCode() override\n}",
        options: ["It will cause a StackOverflowError.", "It violates the contract between `equals()` and `hashCode()`.", "It will throw a NullPointerException when adding to a HashSet.", "There is no issue."],
        answer: "It violates the contract between `equals()` and `hashCode()`.",
        explanation: "The contract states that if two objects are equal according to the `equals()` method, then they must have the same hash code. Since `hashCode()` is not overridden, it uses the default implementation from the `Object` class, which typically returns a distinct integer for each object. This can lead to incorrect behavior in hash-based collections like `HashSet` and `HashMap`, where two equal objects might be stored in different buckets."
      },
      {
        id: 4,
        question: "Given two tables, `T1` and `T2`, what does the `INTERSECT` operator do in SQL?\n`SELECT ID FROM T1 INTERSECT SELECT ID FROM T2;`",
        options: ["Returns all rows from T1 and T2, including duplicates.", "Returns rows that are present in both the result sets of T1 and T2.", "Returns rows from T1 that are not in T2.", "Returns all rows from T1 and unique rows from T2."],
        answer: "Returns rows that are present in both the result sets of T1 and T2.",
        explanation: "The `INTERSECT` operator combines two `SELECT` statements and returns only the rows that appear in both result sets. It's the set-theoretic intersection of the two sets of rows. Duplicate rows are removed from the final result set."
      },
      {
        id: 5,
        question: "In an AVL tree, which rotation is performed when a new node is inserted into the left subtree of the right child of a node, causing an imbalance?",
        options: ["LL Rotation (Single Right Rotation)", "RR Rotation (Single Left Rotation)", "LR Rotation (Left-Right Rotation)", "RL Rotation (Right-Left Rotation)"],
        answer: "RL Rotation (Right-Left Rotation)",
        explanation: "An RL imbalance occurs when a node becomes unbalanced due to an insertion in the Left subtree of its Right child. To fix this, a Right-Left double rotation is performed: first a right rotation on the right child, followed by a left rotation on the original node."
      },
      {
        id: 6,
        question: "What is the output of this C program?\n#include <stdio.h>\nint main() {\n int x = 5;\n if (x == 5) {\n goto end;\n }\n x = 10;\nend:\n printf(\"%d\", x);\n return 0;\n}",
        options: ["10", "5", "0", "Compilation Error"],
        answer: "5",
        explanation: "The `if` condition `x == 5` is true. The `goto end;` statement unconditionally jumps the program's execution to the label `end:`. The line `x = 10;` is skipped. Therefore, the `printf` statement prints the value of `x`, which is still 5."
      },
      {
        id: 7,
        question: "What happens when you try to compile this C++ code?\n#include <iostream>\nclass AbstractBase {\npublic:\n virtual void mustImplement() = 0;\n};\nint main() {\n AbstractBase ab;\n return 0;\n}",
        options: ["It compiles and runs successfully.", "It results in a runtime error.", "It fails to compile because an abstract class cannot be instantiated.", "It compiles but with a warning."],
        answer: "It fails to compile because an abstract class cannot be instantiated.",
        explanation: "An abstract class is a class that has at least one pure virtual function (e.g., `virtual void func() = 0;`). The purpose of an abstract class is to be a base class for other classes. You cannot create an object (an instance) of an abstract class itself."
      },
      {
        id: 8,
        question: "What will be printed by the following Java code?\npublic class Main {\n public static synchronized void main(String[] args) throws InterruptedException {\n Thread t = new Thread(() -> {\n System.out.println(\"Thread Run\");\n });\n t.start();\n System.out.println(\"Main Start\");\n t.join();\n System.out.println(\"Main End\");\n }\n}",
        options: ["Main Start\nThread Run\nMain End", "It has unpredictable output.", "Main Start\nMain End\nThread Run", "Compilation Error"],
        answer: "Main Start\nThread Run\nMain End",
        explanation: "The `t.join()` call causes the `main` thread to pause and wait until the thread `t` has finished its execution. Therefore, \"Main Start\" is printed, then the new thread `t` starts and prints \"Thread Run\". Once `t` is finished, the `main` thread resumes and prints \"Main End\". The `synchronized` keyword on `main` has no effect here as there's no contention."
      },
      {
        id: 9,
        question: "In SQL, what is a primary use case for a window function like `ROW_NUMBER()`?",
        options: ["To calculate a total sum of a column.", "To filter rows based on a condition.", "To assign a unique rank to each row within a partition of a result set.", "To combine rows from two different tables."],
        answer: "To assign a unique rank to each row within a partition of a result set.",
        explanation: "Window functions perform a calculation across a set of table rows that are somehow related to the current row. `ROW_NUMBER()` is a common window function used for ranking results, for example, finding the top N records per category (e.g., top 3 selling products in each region)."
      },
      {
        id: 10,
        question: "What is a key characteristic of Dijkstra's algorithm for finding the shortest path?",
        options: ["It works correctly with negative edge weights.", "It is a greedy algorithm.", "It finds the longest path in a graph.", "It only works on trees."],
        answer: "It is a greedy algorithm.",
        explanation: "Dijkstra's algorithm is a greedy algorithm because at each step, it picks the unvisited vertex with the lowest-distance estimate from the source, adds it to the set of visited vertices, and updates the distances of its neighbors. It does not work correctly if the graph has negative edge weights."
      },
      {
        id: 11,
        question: "What will this C preprocessor directive expand to?\n#include <stdio.h>\n#define TO_STRING(s) #s\nint main() {\n printf(\"%s\", TO_STRING(Hello World));\n return 0;\n}",
        options: ["Hello World", "\"Hello World\"", "\"Hello\"", "Compilation Error"],
        answer: "\"Hello World\"",
        explanation: "The `#` operator in a C preprocessor macro is the stringizing operator. It takes the argument passed to the macro and converts it into a string literal. So, `TO_STRING(Hello World)` becomes `\"Hello World\"`."
      },
      {
        id: 12,
        question: "What is the output of the C++ code snippet?\n#include <iostream>\n#include <vector>\nint main() {\n std::vector<int> v = {1, 2, 3};\n for (int x : v) {\n x = 0;\n }\n for (int x : v) {\n std::cout << x << \" \";\n }\n return 0;\n}",
        options: ["0 0 0", "1 2 3", "1 0 0", "Compilation Error"],
        answer: "1 2 3",
        explanation: "The first range-based for loop `for (int x : v)` creates a copy of each element from the vector `v` into the variable `x`. Modifying `x` inside the loop does not affect the original elements in the vector `v`. To modify the elements, a reference should be used: `for (int &x : v)`."
      },
      {
        id: 13,
        question: "In Java, which of these is a valid declaration of an inner class?",
        options: ["class Outer { class Inner {} }", "inner class Inner {}", "class Outer { private static class Inner {} }", "Both A and C."],
        answer: "Both A and C.",
        explanation: "Java supports multiple types of inner classes. A is a standard (non-static) inner class, which has access to members of the outer class instance. C is a static nested class, which does not have access to the non-static members of the outer class instance and can be instantiated without an instance of the outer class. Both are valid declarations."
      },
      {
        id: 14,
        question: "What does the `ON DELETE CASCADE` constraint do in SQL?",
        options: ["Prevents a row from being deleted if it is referenced by a foreign key.", "Automatically deletes the corresponding rows in the child table when a row in the parent table is deleted.", "Sets the foreign key columns to NULL in the child table when a row in the parent table is deleted.", "Raises an error when a deletion is attempted on a parent table."],
        answer: "Automatically deletes the corresponding rows in the child table when a row in the parent table is deleted.",
        explanation: "`ON DELETE CASCADE` is a referential integrity action for a foreign key. It specifies that if a record in the parent table is deleted, then all corresponding records in the child table should also be automatically deleted. This helps maintain data consistency."
      },
      {
        id: 15,
        question: "What is the result of a post-order traversal on the following binary search tree?\n 10\n / \\\n 5 15\n / \\\n 3 7",
        options: ["10, 5, 15, 3, 7", "3, 7, 5, 15, 10", "3, 5, 7, 10, 15", "10, 15, 7, 5, 3"],
        answer: "3, 7, 5, 15, 10",
        explanation: "Post-order traversal follows the Left-Right-Root pattern. You traverse the left subtree, then the right subtree, and finally visit the root node. For this tree, the traversal is: (traverse 5's left subtree: 3) -> (traverse 5's right subtree: 7) -> (visit 5) -> (traverse 10's right subtree: 15) -> (visit 10)."
      },
      {
        id: 16,
        question: "What does the `volatile` keyword in C indicate to the compiler?\n#include <stdio.h>\nint main() {\n volatile int sensor_reading = 1;\n // ... code that might be optimized\n return 0;\n}",
        options: ["The variable cannot be modified.", "The variable's value may change at any time by something outside of the program's control.", "The variable is stored in a special memory region.", "The variable must be initialized."],
        answer: "The variable's value may change at any time by something outside of the program's control.",
        explanation: "The `volatile` keyword tells the compiler that a variable's value can be changed by external factors (e.g., a hardware device, another thread). This prevents the compiler from making optimizations that assume the variable's value only changes within the code, ensuring that the variable is always read from memory rather than a cached register."
      },
      {
        id: 17,
        question: "What is demonstrated by this C++ code?\n#include <iostream>\nclass File {\npublic:\n File(const char* name) { std::cout << \"Opening \" << name << std::endl; }\n ~File() { std::cout << \"Closing file\" << std::endl; }\n};\nvoid processFile() {\n File f(\"data.txt\");\n // process the file\n // ...\n} // f goes out of scope here\nint main() {\n processFile();\n return 0;\n}",
        options: ["Memory Leak", "Resource Acquisition Is Initialization (RAII)", "Manual Memory Management", "Static binding"],
        answer: "Resource Acquisition Is Initialization (RAII)",
        explanation: "RAII is a C++ programming technique where resource management (like memory, files, sockets) is tied to the lifetime of objects. In this example, the `File` object `f` is created on the stack. The resource (the file) is acquired in the constructor. When `f` goes out of scope at the end of `processFile`, its destructor is automatically called, which releases the resource. This ensures resources are properly cleaned up, even in the presence of exceptions."
      },
      {
        id: 18,
        question: "In Java, what is the main difference between `wait()` and `sleep()`?",
        options: ["`wait()` is a method of the `Object` class, while `sleep()` is a static method of the `Thread` class.", "`wait()` releases the lock (monitor) on the object, while `sleep()` does not.", "`sleep()` is used for inter-thread communication, while `wait()` is for pausing execution.", "Both A and B."],
        answer: "Both A and B.",
        explanation: "`sleep()` is a static method on the `Thread` class that pauses the current thread for a specified amount of time without releasing any locks it holds. `wait()` is a method on the `Object` class used for inter-thread communication. A thread calling `obj.wait()` releases the lock on `obj` and waits until another thread calls `obj.notify()` or `obj.notifyAll()`."
      },
      {
        id: 19,
        question: "A database table `Events` has a `TIMESTAMP` column named `event_time`. Which SQL query correctly selects events that occurred today?",
        options: ["SELECT * FROM Events WHERE event_time = TODAY();", "SELECT * FROM Events WHERE DATE(event_time) = CURRENT_DATE;", "SELECT * FROM Events WHERE event_time IS CURRENT_DATE;", "SELECT * FROM Events WHERE DAY(event_time) = DAY(NOW());"],
        answer: "SELECT * FROM Events WHERE DATE(event_time) = CURRENT_DATE;",
        explanation: "`TIMESTAMP` values contain both date and time parts. To compare only the date part, you must extract it from the `event_time` column using a function like `DATE()`. `CURRENT_DATE` is a standard SQL function that returns the current date. This query correctly compares just the date parts."
      },
      {
        id: 20,
        question: "What is the time complexity of the build_heap operation in a binary heap with n elements?",
        options: ["O(n log n)", "O(log n)", "O(n)", "O(1)"],
        answer: "O(n)",
        explanation: "Although building a heap by inserting n elements one by one would take O(n log n) time, a more efficient bottom-up approach (often called heapify) can construct the heap in linear time, O(n). This algorithm starts from the last non-leaf node and works its way up to the root, heapifying each subtree."
      },
      {
        id: 21,
        question: "What is the output of this C code?\n#include <stdio.h>\nenum State { OFF, ON };\nint main() {\n enum State s = ON;\n printf(\"%d\", s);\n return 0;\n}",
        options: ["ON", "1", "0", "Compilation Error"],
        answer: "1",
        explanation: "In C, an `enum` (enumeration) is a user-defined type consisting of a set of named integer constants. By default, the first enumerator (`OFF`) is assigned the value 0, and each subsequent enumerator is one greater than the previous one. Therefore, `ON` has the integer value 1."
      },
      {
        id: 22,
        question: "In C++, what is the purpose of the `explicit` keyword on a constructor?\n#include <iostream>\nclass MyNumber {\npublic:\n explicit MyNumber(int num) {}\n};\nvoid printNum(MyNumber n) {}\nint main() {\n // printNum(10); // This line would cause an error\n printNum(MyNumber(10)); // This is okay\n return 0;\n}",
        options: ["It makes the constructor private.", "It prevents the compiler from performing implicit type conversions using that constructor.", "It ensures the constructor is inlined.", "It marks the constructor for use only by derived classes."],
        answer: "It prevents the compiler from performing implicit type conversions using that constructor.",
        explanation: "A constructor that can be called with a single argument can be used by the compiler to perform an implicit conversion (e.g., converting an `int` to a `MyNumber`). The `explicit` keyword disables this behavior, forcing the programmer to make the type conversion explicit, which can prevent subtle bugs."
      },
      {
        id: 23,
        question: "What is the output of this Java code snippet?\npublic class Main {\n public static void main(String[] args) {\n Integer i = new Integer(10);\n modify(i);\n System.out.println(i);\n }\n public static void modify(Integer i) {\n i = i + 1;\n }\n}",
        options: ["10", "11", "Null", "Compilation Error"],
        answer: "10",
        explanation: "Java is pass-by-value. When the `Integer` object `i` is passed to the `modify` method, a copy of the reference is passed. Inside the method, `i = i + 1;` creates a *new* `Integer` object with the value 11 (due to auto-unboxing and auto-boxing) and assigns this new object's reference to the local variable `i`. The original `i` in the `main` method remains unchanged and still points to the `Integer` object with the value 10."
      },
      {
        id: 24,
        question: "Which SQL statement is used to give a user permission to access a database object?",
        options: ["`ALLOW USER user_name ON object_name;`", "`SET PERMISSION FOR user_name ON object_name;`", "`GRANT SELECT, UPDATE ON object_name TO user_name;`", "`ASSIGN ACCESS TO user_name FOR object_name;`"],
        answer: "`GRANT SELECT, UPDATE ON object_name TO user_name;`",
        explanation: "The `GRANT` statement is part of SQL's Data Control Language (DCL). It is used by database administrators to grant specific privileges (like `SELECT`, `INSERT`, `UPDATE`, `DELETE`) on database objects (like tables, views) to specific users or roles."
      },
      {
        id: 25,
        question: "A Breadth-First Search (BFS) algorithm is implemented using which data structure?",
        options: ["Stack", "Queue", "Heap", "Hash Table"],
        answer: "Queue",
        explanation: "BFS explores a graph level by level. A queue, which follows the First-In, First-Out (FIFO) principle, is the ideal data structure for managing the nodes to visit. A node is visited, and then all its unvisited neighbors are added to the queue. The algorithm then processes the node at the front of the queue."
      },
      {
        id: 26,
        question: "Predict the output of the C program.\n#include <stdio.h>\nint main(int argc, char *argv[]) {\n printf(\"%d\", argc);\n return 0;\n}\n// Command line: ./myprog arg1 arg2",
        options: ["1", "2", "3", "0"],
        answer: "3",
        explanation: "`argc` (argument count) is an integer that holds the number of arguments passed to the program from the command line. This count includes the name of the program itself. In this case, `./myprog`, `arg1`, and `arg2` are three separate arguments, so `argc` will be 3."
      },
      {
        id: 27,
        question: "What kind of inheritance results in the \"diamond problem\" in C++?",
        options: ["Single Inheritance", "Multilevel Inheritance", "Multiple Inheritance", "Hierarchical Inheritance"],
        answer: "Multiple Inheritance",
        explanation: "The diamond problem occurs when a class inherits from two or more classes that have a common base class. This creates ambiguity because it's unclear which version of the base class's members the final derived class should inherit. C++ solves this ambiguity using virtual inheritance."
      },
      {
        id: 28,
        question: "Which of these is NOT a method of the `java.lang.Object` class?",
        options: ["`equals(Object obj)`", "`clone()`", "`compareTo(Object obj)`", "`toString()`"],
        answer: "`compareTo(Object obj)`",
        explanation: "The `compareTo` method is not part of the `Object` class. It is the single method defined in the `Comparable` interface, which classes implement to define their natural ordering. `equals`, `clone`, `toString`, `hashCode`, `wait`, `notify`, `notifyAll`, and `finalize` are all methods of the `Object` class."
      },
      {
        id: 29,
        question: "What is the purpose of an index in a database?",
        options: ["To enforce data integrity.", "To provide a unique identifier for each row.", "To speed up the retrieval of rows from a table.", "To define relationships between tables."],
        answer: "To speed up the retrieval of rows from a table.",
        explanation: "An index is a special lookup table that the database search engine can use to find data more quickly. It's similar to the index in the back of a book. Instead of scanning the entire table (a full table scan), the database can use the index to go directly to the rows that match the query criteria, significantly improving query performance."
      },
      {
        id: 30,
        question: "Which sorting algorithm has the best-case time complexity of O(n)?",
        options: ["Merge Sort", "Heapsort", "Insertion Sort", "Selection Sort"],
        answer: "Insertion Sort",
        explanation: "Insertion Sort's performance is best when the input array is already sorted or nearly sorted. In this best-case scenario, it only needs to make one pass through the data, resulting in a linear time complexity of O(n). The other algorithms listed have a consistent time complexity of O(n log n) or O(n^2) regardless of the initial order."
      },
      {
        id: 31,
        question: "What is the value of `ptr` after execution?\n#include <stdio.h>\n#include <stdlib.h>\nint main() {\n int *ptr = (int*)malloc(sizeof(int));\n *ptr = 10;\n free(ptr);\n // What is the state of ptr here?\n return 0;\n}",
        options: ["NULL", "Points to the address 0", "It becomes a dangling pointer", "It points to a valid memory location containing 10"],
        answer: "It becomes a dangling pointer",
        explanation: "The `free()` function deallocates the memory that `ptr` was pointing to, returning it to the system. However, `free()` does not change the value of the pointer variable `ptr` itself. `ptr` still holds the same memory address, but that address is no longer valid. This state is known as a dangling pointer."
      },
      {
        id: 32,
        question: "Which of the following is true about a C++ destructor?",
        options: ["It can be overloaded.", "It can have parameters.", "It is automatically called when an object is destroyed.", "A class can have multiple destructors."],
        answer: "It is automatically called when an object is destroyed.",
        explanation: "A destructor is a special member function that is executed automatically whenever an object of the class goes out of scope or is explicitly deleted using `delete`. Destructors cannot be overloaded, cannot have parameters, and a class can only have one destructor. Its name is the tilde `~` followed by the class name."
      },
      {
        id: 33,
        question: "What is the output of the Java program?\npublic class Main {\n public static void main(String[] args) {\n String str = null;\n if (str instanceof String) {\n System.out.println(\"True\");\n } else {\n System.out.println(\"False\");\n }\n }\n}",
        options: ["True", "False", "Throws NullPointerException", "Compilation Error"],
        answer: "False",
        explanation: "The `instanceof` operator in Java checks if an object is an instance of a particular class. A key rule is that `null instanceof <AnyType>` always evaluates to `false`. Therefore, the `else` block is executed."
      },
      {
        id: 34,
        question: "How would you select all columns from a table named `Products` where the `ProductName` starts with the letter 'C'?",
        options: ["`SELECT * FROM Products WHERE ProductName LIKE 'C%';`", "`SELECT * FROM Products WHERE ProductName = 'C*';`", "`SELECT * FROM Products WHERE ProductName STARTS WITH 'C';`", "`SELECT * FROM Products WHERE ProductName BEGINS 'C';`"],
        answer: "`SELECT * FROM Products WHERE ProductName LIKE 'C%';`",
        explanation: "The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column. The percent sign `%` is a wildcard character that represents zero, one, or multiple characters. So, `'C%'` matches any string that starts with 'C'."
      },
      {
        id: 35,
        question: "What defines a \"full binary tree\"?",
        options: ["A binary tree where every node has either 0 or 2 children.", "A binary tree where all levels are completely filled, except possibly the last.", "A binary tree where every node has a value greater than all nodes in its left subtree.", "A binary tree where the height difference between left and right subtrees is at most 1."],
        answer: "A binary tree where every node has either 0 or 2 children.",
        explanation: "A full binary tree (sometimes called a proper binary tree) is a tree in which every node other than the leaves has exactly two children. All nodes have either zero children (leaf nodes) or two children."
      },
      {
        id: 36,
        question: "What is the output?\n#include <stdio.h>\nint main() {\n int x = 1, y = 1, z = 1;\n x += y += z;\n printf(\"%d %d %d\", x, y, z);\n return 0;\n}",
        options: ["3 2 1", "1 2 3", "2 2 1", "3 3 1"],
        answer: "3 2 1",
        explanation: "The compound assignment operator `+=` has right-to-left associativity. Therefore, `y += z` is evaluated first. `y` becomes `1 + 1 = 2`. Then, `x += y` is evaluated. `x` becomes `1 + 2 = 3`. The value of `z` remains 1."
      },
      {
        id: 37,
        question: "What is file handling in C++?",
        options: ["The process of reading from and writing to files.", "A mechanism for handling runtime errors related to files.", "A way to compile C++ source code files.", "The process of organizing files on a storage device."],
        answer: "The process of reading from and writing to files.",
        explanation: "File handling, or file I/O, refers to the set of operations that allow a program to interact with files on a disk. C++ provides classes like `ifstream` (for input), `ofstream` (for output), and `fstream` (for both) in the `<fstream>` library to perform these operations."
      },
      {
        id: 38,
        question: "Which Java collection provides a sorted unique set?",
        options: ["`HashSet`", "`LinkedHashSet`", "`TreeSet`", "`ArrayList`"],
        answer: "`TreeSet`",
        explanation: "`TreeSet` is an implementation of the `SortedSet` interface. It stores its elements in a sorted order (either natural ordering or according to a specified `Comparator`). Like all sets, it does not allow duplicate elements."
      },
      {
        id: 39,
        question: "What is the main difference between `VARCHAR(50)` and `CHAR(50)` in SQL?",
        options: ["`CHAR(50)` can store more characters than `VARCHAR(50)`.", "`VARCHAR(50)` stores variable-length strings, while `CHAR(50)` stores fixed-length strings.", "`VARCHAR(50)` is used for numbers, while `CHAR(50)` is for text.", "There is no difference."],
        answer: "`VARCHAR(50)` stores variable-length strings, while `CHAR(50)` stores fixed-length strings.",
        explanation: "For a `CHAR(50)` column, the database always allocates 50 bytes of storage, padding any shorter strings with spaces. For a `VARCHAR(50)` column, the storage used is the actual length of the string plus a small amount of overhead. `VARCHAR` is generally more space-efficient for data where the length varies significantly."
      },
      {
        id: 40,
        question: "Which of the following is NOT a characteristic of a stack data structure?",
        options: ["LIFO (Last-In, First-Out)", "Can be implemented using an array or a linked list.", "Elements are accessed in a FIFO (First-In, First-Out) manner.", "Used for managing function calls."],
        answer: "Elements are accessed in a FIFO (First-In, First-Out) manner.",
        explanation: "The defining characteristic of a stack is LIFO (Last-In, First-Out). The last element added to the stack is the first one to be removed. FIFO behavior is characteristic of a queue, not a stack."
      },
      {
        id: 41,
        question: "What is the value of `a` and `b` after this code?\n#include <stdio.h>\nint main() {\n int a = 5, b = 10;\n a = a ^ b;\n b = a ^ b;\n a = a ^ b;\n printf(\"a=%d, b=%d\", a, b);\n return 0;\n}",
        options: ["a=5, b=10", "a=10, b=5", "a=15, b=15", "a=0, b=0"],
        answer: "a=10, b=5",
        explanation: "This sequence of three XOR operations is a classic algorithm for swapping two integer variables without using a temporary variable. After the three operations, the initial value of `b` is stored in `a`, and the initial value of `a` is stored in `b`."
      },
      {
        id: 42,
        question: "In C++, what is a copy constructor?",
        options: ["A constructor used to create an object as a copy of another existing object.", "A special function that copies one file to another.", "A constructor that takes no arguments.", "A constructor that is inherited from a base class."],
        answer: "A constructor used to create an object as a copy of another existing object.",
        explanation: "A copy constructor is a member function that initializes an object using another object of the same class. It is called when a new object is created from an existing one, when an object is passed by value to a function, or when an object is returned by value from a function."
      },
      {
        id: 43,
        question: "Which statement about garbage collection in Java is true?",
        options: ["The programmer can explicitly call the garbage collector using `System.gc()`.", "Calling `System.gc()` guarantees that the garbage collector will run immediately.", "Garbage collection prevents `OutOfMemoryError`.", "The garbage collector reclaims memory from objects that are no longer reachable."],
        answer: "The garbage collector reclaims memory from objects that are no longer reachable.",
        explanation: "The primary role of the garbage collector is to automatically manage memory by deallocating objects that the program can no longer access. While `System.gc()` can be called to *suggest* that the JVM run the garbage collector, it provides no guarantee. Even with garbage collection, an `OutOfMemoryError` can still occur if the application's memory usage exceeds the available heap space."
      },
      {
        id: 44,
        question: "A table `Sales` has columns `ProductID` and `Amount`. How do you find the total sales amount for each product?",
        options: ["`SELECT ProductID, SUM(Amount) FROM Sales;`", "`SELECT ProductID, SUM(Amount) FROM Sales GROUP BY ProductID;`", "`SELECT ProductID, TOTAL(Amount) FROM Sales ORDER BY ProductID;`", "`SELECT ProductID, AGGREGATE(Amount) FROM Sales BY ProductID;`"],
        answer: "`SELECT ProductID, SUM(Amount) FROM Sales GROUP BY ProductID;`",
        explanation: "To calculate an aggregate value (like a sum) for different groups of rows, you use an aggregate function (`SUM(Amount)`) in conjunction with the `GROUP BY` clause. This query groups all rows with the same `ProductID` and calculates the sum of their `Amount` values."
      },
      {
        id: 45,
        question: "In a graph, what is a \"cycle\"?",
        options: ["A path that starts and ends at the same vertex.", "A set of vertices that are not connected to the rest of the graph.", "The longest possible path between two vertices.", "A vertex with the highest degree."],
        answer: "A path that starts and ends at the same vertex.",
        explanation: "A cycle is a path in a graph that contains one or more edges and originates and terminates at the same vertex. A graph that does not contain any cycles is called an acyclic graph."
      },
      {
        id: 46,
        question: "What is the output of the following C program?\n#include <stdio.h>\nint main() {\n char str[] = \"C Programming\";\n char *ptr = str;\n ptr += 2;\n printf(\"%c\", *ptr);\n return 0;\n}",
        options: ["C", "P", "(space character)", "r"],
        answer: "P",
        explanation: "`ptr` is initialized to point to the first character of `str`, which is 'C'. The statement `ptr += 2;` advances the pointer by two positions. It now points to the third character of the string (at index 2), which is 'P'."
      },
      {
        id: 47,
        question: "In C++, what is a smart pointer?",
        options: ["A pointer that automatically converts between data types.", "A class that wraps a raw pointer to manage the lifetime of the object it points to.", "A pointer that can point to multiple memory addresses simultaneously.", "A special type of pointer used only for arithmetic operations."],
        answer: "A class that wraps a raw pointer to manage the lifetime of the object it points to.",
        explanation: "Smart pointers (like `std::unique_ptr` and `std::shared_ptr`) are objects that behave like pointers but provide automatic memory management. They automatically deallocate the memory they point to when the smart pointer object goes out of scope, which helps prevent memory leaks."
      },
      {
        id: 48,
        question: "What is the role of the `ClassLoader` in Java?",
        options: ["To compile `.java` files into `.class` files.", "To load class files from disk into memory (the JVM) at runtime.", "To manage the layout of graphical user interface components.", "To link classes together before execution."],
        answer: "To load class files from disk into memory (the JVM) at runtime.",
        explanation: "The Java ClassLoader is a part of the Java Runtime Environment (JRE) that dynamically loads Java classes into the Java Virtual Machine (JVM). It follows a delegation model to find and load the bytecode for a class."
      },
      {
        id: 49,
        question: "What is database normalization?",
        options: ["The process of creating backups of a database.", "The process of organizing columns and tables in a relational database to minimize data redundancy.", "The process of encrypting data stored in a database.", "The process of optimizing queries for faster performance."],
        answer: "The process of organizing columns and tables in a relational database to minimize data redundancy.",
        explanation: "Normalization is a systematic approach of decomposing tables to eliminate data redundancy and undesirable characteristics like Insertion, Update, and Deletion Anomalies. It involves dividing larger tables into smaller, well-structured tables and defining relationships between them."
      },
      {
        id: 50,
        question: "What is a \"Trie\" (Prefix Tree) data structure primarily used for?",
        options: ["Sorting a list of numbers.", "Implementing a priority queue.", "Efficient retrieval of keys in a dataset of strings.", "Representing a network of nodes and edges."],
        answer: "Efficient retrieval of keys in a dataset of strings.",
        explanation: "A Trie is a tree-like data structure that is very efficient for searching for words in a dictionary, finding words with a common prefix, or implementing features like autocomplete. Each node represents a character, and paths from the root to a node represent a prefix."
      },
      {
        id: 51,
        question: "What is the output of the following C code snippet?\n#include <stdio.h>\nint main() {\n int arr[2][2] = {{1, 2}, {3, 4}};\n printf(\"%d\", *(*arr + 1));\n return 0;\n}",
        options: ["1", "2", "3", "Garbage Value"],
        answer: "2",
        explanation: "`arr` is a 2D array. The expression `arr` decays to a pointer to its first element, which is the first row `&arr[0]`. `*arr` dereferences this, giving the first row `arr[0]`. `*arr + 1` then points to the second element of the first row, `&arr[0][1]`. Finally, the outer `*` dereferences this pointer, giving the value at that location, which is 2."
      },
      {
        id: 52,
        question: "Which statement is false about `friend` functions in C++?",
        options: ["A friend function can be a member of another class.", "A friend function is declared inside the class but is not a member of the class.", "Friendship is not inherited.", "A friend function of a class can directly access the private members of the parent of that class."],
        answer: "A friend function of a class can directly access the private members of the parent of that class.",
        explanation: "Friendship is not transitive or inherited. A friend function of a class `C` has access to the private members of class `C` only. It does not get access to the private members of any base classes that `C` might inherit from."
      },
      {
        id: 53,
        question: "What is the final value of `result` in this Java code?\npublic class Main {\n public static void main(String[] args) {\n boolean a = true;\n boolean b = false;\n int result = (a ? 1 : 0) * 10 + (b ? 1 : 0) * 5;\n System.out.println(result);\n }\n}",
        options: ["15", "10", "5", "0"],
        answer: "10",
        explanation: "Boolean values are not automatically converted to integers in Java. The ternary operator `(a ? 1 : 0)` evaluates to `1` because `a` is true. The expression `(b ? 1 : 0)` evaluates to `0` because `b` is false. The calculation then becomes `1 * 10 + 0 * 5`, which results in `10`."
      },
      {
        id: 54,
        question: "In SQL, what does the `COALESCE` function do?",
        options: ["It converts a value from one data type to another.", "It concatenates two or more strings.", "It returns the first non-NULL value in a list of expressions.", "It calculates the average of a set of values, ignoring NULLs."],
        answer: "It returns the first non-NULL value in a list of expressions.",
        explanation: "`COALESCE` is a useful function that takes a variable number of arguments and returns the first argument that is not `NULL`. If all arguments are `NULL`, it returns `NULL`. It's often used to provide a default value for a column that might be `NULL`. For example, `COALESCE(MiddleName, 'N/A')`."
      },
      {
        id: 55,
        question: "In a hash table that uses chaining to resolve collisions, what is the worst-case time complexity for a search operation?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        answer: "O(n)",
        explanation: "The worst-case scenario for a hash table with chaining occurs when all `n` keys hash to the same index. In this case, the hash table degenerates into a single linked list, and a search operation would require traversing the entire list, resulting in a time complexity of O(n)."
      },
      {
        id: 56,
        question: "What does `_IOFBF` mean when used with `setvbuf` in C?",
        options: ["Input/Output Fast Buffer", "Input/Output File Buffer", "Input/Output Fully Buffered", "Input/Output For Binary Files"],
        answer: "Input/Output Fully Buffered",
        explanation: "The `setvbuf` function is used to control stream buffering. The mode `_IOFBF` stands for \"Input/Output Fully Buffered\". This means that data is transmitted to or from the file in blocks (of size defined by the buffer) only when the buffer is full. The other modes are `_IOLBF` (line buffered) and `_IONBF` (unbuffered)."
      },
      {
        id: 57,
        question: "In C++, what is a virtual destructor used for?",
        options: ["To create a destructor that cannot be overridden.", "To ensure that the correct destructor is called when deleting an object through a base class pointer.", "To make a class abstract.", "To prevent a class from being destroyed."],
        answer: "To ensure that the correct destructor is called when deleting an object through a base class pointer.",
        explanation: "If you have a base class pointer pointing to a derived class object and you `delete` it, only the base class destructor will be called unless the base class destructor is declared as `virtual`. A virtual destructor ensures that the destructors of both the derived class and the base class are called (in that order), preventing resource leaks."
      },
      {
        id: 58,
        question: "Which of these statements about `final`, `finally`, and `finalize` in Java is correct?",
        options: ["`final` is a keyword for creating constants, `finally` executes code after a try-catch, and `finalize` is a method called before garbage collection.", "`final` is a method, `finally` is a class, and `finalize` is a keyword.", "They are all keywords used for exception handling.", "`final` prevents inheritance, `finally` is for database transactions, and `finalize` completes an object's initialization."],
        answer: "`final` is a keyword for creating constants, `finally` executes code after a try-catch, and `finalize` is a method called before garbage collection.",
        explanation: "`final` is a keyword to declare constants, prevent method overriding, or stop class inheritance. The `finally` block is used in exception handling to execute code regardless of whether an exception occurred. The `finalize()` method is a protected method of the `Object` class that is called by the garbage collector on an object when it determines that there are no more references to the object."
      },
      {
        id: 59,
        question: "Which is the correct way to write a Common Table Expression (CTE) in SQL?",
        options: ["`CTE myCTE AS (SELECT * FROM Sales) SELECT * FROM myCTE;`", "`DEFINE CTE myCTE AS (SELECT * FROM Sales) SELECT * FROM myCTE;`", "`WITH myCTE AS (SELECT * FROM Sales) SELECT * FROM myCTE;`", "`DECLARE myCTE AS (SELECT * FROM Sales) SELECT * FROM myCTE;`"],
        answer: "`WITH myCTE AS (SELECT * FROM Sales) SELECT * FROM myCTE;`",
        explanation: "A Common Table Expression is a temporary named result set that you can reference within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement. The syntax for defining a CTE starts with the `WITH` keyword, followed by the CTE name, the `AS` keyword, the query definition in parentheses, and finally the main query that uses the CTE."
      },
      {
        id: 60,
        question: "What is an adjacency matrix used to represent?",
        options: ["A sorted list of elements.", "A hierarchical tree structure.", "The relationships (edges) between vertices in a graph.", "A key-value mapping."],
        answer: "The relationships (edges) between vertices in a graph.",
        explanation: "An adjacency matrix is a square matrix used to represent a finite graph. The elements of the matrix indicate whether pairs of vertices are adjacent (connected by an edge) or not in the graph. For an unweighted graph, a value of 1 in `matrix[i][j]` indicates an edge from vertex `i` to vertex `j`, and 0 indicates no edge."
      }
    ]
  }
  ,
  {
    paperId: "tech-paper5",
    name: "Technical Paper 5 - Mixed Topics",
    duration: 60,
    totalQuestions: 60,
    questions: [
      {
        id: 1,
        question: "What is the output of this C program?\\n#include <stdio.h>\\nint main() {\\n int a = 2, b = 7, c = 10;\\n c = a > b ? a : b;\\n c++;\\n b = a + b;\\n a = c + a;\\n printf(\"%d, %d, %d\", a, b, c);\\n return 0;\\n}",
        options: ["10, 9, 8", "8, 9, 10", "10, 9, 7", "9, 10, 8"],
        answer: "10, 9, 8",
        explanation: "c becomes 7 from the ternary, then c++ => 8; b = 2 + 7 = 9; a = 8 + 2 = 10, so prints 10, 9, 8."
      },
      {
        id: 2,
        question: "What will the following C program print?\\n#include <stdio.h>\\nint main() {\\n char str[] = \"Placement Drive\";\\n printf(\"%.5s\", str);\\n return 0;\\n}",
        options: ["Placement Drive", "Place", "Drive", "Compilation Error"],
        answer: "Place",
        explanation: "%.5s prints at most 5 characters of the string, yielding 'Place'."
      },
      {
        id: 3,
        question: "Predict the output of this C code snippet.\\n#include <stdio.h>\\n#include <stdlib.h>\\nint main() {\\n int *p;\\n p = (int*)calloc(1, sizeof(int));\\n if (p)\\n printf(\"Memory allocated: %d\", *p);\\n else\\n printf(\"Allocation failed\");\\n free(p);\\n return 0;\\n}",
        options: ["Memory allocated: 0", "Memory allocated: (Garbage Value)", "Allocation failed", "Compilation Error"],
        answer: "Memory allocated: 0",
        explanation: "calloc zero-initializes; dereferencing yields 0."
      },
      {
        id: 4,
        question: "What is the output of the C code below?\\n#include <stdio.h>\\nint main() {\\n const char *p = \"12345\";\\n const char **q = &p;\\n *q = \"abcde\";\\n printf(\"%s %s\", p, *q);\\n return 0;\\n}",
        options: ["12345 abcde", "12345 12345", "abcde abcde", "Compilation Error"],
        answer: "abcde abcde",
        explanation: "*q = 'abcde' reassigns p; both p and *q print 'abcde'."
      },
      {
        id: 5,
        question: "What is the output of this C program?\\n#include <stdio.h>\\nint main() {\\n int x = 0xAB;\\n int y = 012;\\n printf(\"%d\", x + y);\\n return 0;\\n}",
        options: ["119", "181", "183", "Compilation Error"],
        answer: "181",
        explanation: "0xAB = 171, 012 (octal) = 10; sum = 181."
      },
      {
        id: 6,
        question: "What will be printed by the following C code?\\n#include <stdio.h>\\nstruct test {\\n int x:2;\\n};\\nint main() {\\n struct test t;\\n t.x = 3;\\n t.x++;\\n printf(\"%d\", t.x);\\n return 0;\\n}",
        options: ["4", "3", "1", "0"],
        answer: "0",
        explanation: "2-bit unsigned wraps from 3 (11b) to 0 on increment."
      },
      {
        id: 7,
        question: "Predict the output of this C code.\\n#include <stdio.h>\\nint main() {\\n int arr[] = {1,2,3,4,5};\\n int *p = arr + 4;\\n printf(\"%d\", p[-2]);\\n return 0;\\n}",
        options: ["5", "4", "3", "Undefined Behavior"],
        answer: "3",
        explanation: "p[-2] == *(p-2) == arr[2] which is 3."
      },
      {
        id: 8,
        question: "What is the output of the following program?\\n#include <stdio.h>\\nint main() {\\n int i = 5;\\n do {\\n printf(\"Loop \");\\n } while (i == 0);\\n return 0;\\n}",
        options: ["Loop", "No output", "Infinite loop", "Compilation Error"],
        answer: "Loop",
        explanation: "do-while runs body once before checking condition."
      },
      {
        id: 9,
        question: "What is the output of this C program?\\n#include <stdio.h>\\nint main() {\\n int i;\\n for (i=0; i-5; i++) {\\n printf(\"%d \", i);\\n }\\n return 0;\\n}",
        options: ["0 1 2 3 4", "1 2 3 4 5", "0 1 2 3 4 5", "Infinite loop"],
        answer: "0 1 2 3 4",
        explanation: "Loop continues while i-5 != 0; stops when i==5."
      },
      {
        id: 10,
        question: "What does this C function call demonstrate?\\n#include <stdio.h>\\n#include <string.h>\\nint main() {\\n char dest[10] = \"Hello\";\\n char *src = \"World12345\";\\n strncat(dest, src, 3);\\n printf(\"%s\", dest);\\n return 0;\\n}",
        options: ["Buffer overflow", "Safe string concatenation", "String comparison", "String tokenization"],
        answer: "Safe string concatenation",
        explanation: "strncat appends at most n chars and NUL-terminates; result 'HelloWor'."
      },
      {
        id: 11,
        question: "What is the output of the following C++ program?\\n#include <iostream>\\nstruct A {\\n virtual void func() { std::cout << \"A\"; }\\n};\\nstruct B : A {\\n void func() { std::cout << \"B\"; }\\n};\\nint main() {\\n B b;\\n A &a = b;\\n a.A::func();\\n return 0;\\n}",
        options: ["A", "B", "Compilation Error", "No output"],
        answer: "A",
        explanation: "Scope resolution calls A::func explicitly, bypassing virtual dispatch."
      },
      {
        id: 12,
        question: "Predict the output of this C++ program.\\n#include <iostream>\\nclass Test {\\npublic:\\n int *p;\\n Test() { p = new int(10); }\\n ~Test() { delete p; }\\n};\\nint main() {\\n Test t1;\\n Test t2 = t1;\\n return 0;\\n}",
        options: ["No error", "Compilation Error", "Runtime error (double free)", "Memory leak"],
        answer: "Runtime error (double free)",
        explanation: "Shallow copy leads both destructors to delete same pointer."
      },
      {
        id: 13,
        question: "What is the output of this code snippet?\\n#include <iostream>\\n#include <vector>\\nint main() {\\n std::vector<int> v(3, 10);\\n v.resize(5);\\n for (int x : v) {\\n std::cout << x << \" \";\\n }\\n return 0;\\n}",
        options: ["10 10 10", "10 10 10 0 0", "10 10 10 10 10", "An exception is thrown"],
        answer: "10 10 10 0 0",
        explanation: "New elements after resize are value-initialized to 0."
      },
      {
        id: 14,
        question: "What does the following C++ program print?\\n#include <iostream>\\nint main() {\\n int x = 10;\\n auto l = [&x]() { x = 20; };\\n l();\\n std::cout << x;\\n return 0;\\n}",
        options: ["10", "20", "0", "Compilation Error"],
        answer: "20",
        explanation: "Lambda captures x by reference and modifies it to 20."
      },
      {
        id: 15,
        question: "What is the output of this C++ program?\\n#include <iostream>\\nstruct S {\\n S() { std::cout << \"S\"; }\\n ~S() { std::cout << \"~S\"; }\\n};\\nint main() {\\n S *s = (S*) ::operator new(sizeof(S));\\n new (s) S();\\n s->~S();\\n ::operator delete(s);\\n return 0;\\n}",
        options: ["S~S", "S", "~S", "Compilation Error"],
        answer: "S~S",
        explanation: "Placement new constructs, explicit destructor prints ~S, then delete raw memory."
      },
      {
        id: 16,
        question: "What is the output of this C++ program?\\n#include <iostream>\\nstruct A {\\n int x;\\n static int y;\\n};\\nint A::y = 10;\\nint main() {\\n std::cout << sizeof(A);\\n return 0;\\n}",
        options: ["4", "8", "0", "Compilation Error"],
        answer: "4",
        explanation: "sizeof excludes static members; only 'x' counts."
      },
      {
        id: 17,
        question: "Predict the output of the code.\\n#include <iostream>\\nint main() { char s[] = \"abc\"; std::cout << sizeof(s); return 0; }",
        options: ["3","4","8 (size of a pointer)","Implementation-defined"],
        answer: "4",
        explanation: "Includes null terminator; array size is 4."
      },
      {
        id: 18,
        question: "What is the output of the following C++ code?\\n#include <iostream>\\n#include <tuple>\\nint main() { auto my_tuple = std::make_tuple(\"hello\", 10); std::cout << std::get<0>(my_tuple); return 0; }",
        options: ["hello","10","An exception is thrown","Compilation Error"],
        answer: "hello",
        explanation: "std::get<0> accesses first element."
      },
      {
        id: 19,
        question: "What is the output of the program?\\n#include <iostream>\\nint main() { int i = 1; if (++i == 2) std::cout << \"A\"; if (i++ == 2) std::cout << \"B\"; if (i == 3) std::cout << \"C\"; return 0; }",
        options: ["A","B","C","ABC"],
        answer: "ABC",
        explanation: "All three conditions are true in sequence."
      },
      {
        id: 20,
        question: "What is the result of running this C++ code?\\n#include <iostream>\\nstruct MyStruct { MyStruct() { std::cout << \"C\"; } MyStruct(const MyStruct&) = delete; };\\nMyStruct func() { return MyStruct(); }\\nint main() { MyStruct s = func(); return 0; }",
        options: ["C","No output","Runtime Error","Compilation Error"],
        answer: "C",
        explanation: "Guaranteed copy elision constructs directly; deleted copy not used."
      },
      {
        id: 21,
        question: "What is the output of this Java program?\\npublic class Main { public static void main(String[] args) { short s = 10; s = s + 5; System.out.println(s); } }",
        options: ["15","10","An exception is thrown","Compilation Error"],
        answer: "Compilation Error",
        explanation: "s+5 promotes to int; narrowing assignment to short requires a cast."
      },
      {
        id: 22,
        question: "What does the following Java program print?\\npublic class Main { private static void test(int i) { System.out.print(\"I\"); } private static void test(Integer i) { System.out.print(\"W\"); } public static void main(String[] args) { int val = 10; test(val); } }",
        options: ["I","W","It is ambiguous, Compilation Error","NullPointerException"],
        answer: "I",
        explanation: "Overload resolution prefers primitive match over boxing."
      },
      {
        id: 23,
        question: "What is the output of this Java code?\\nimport java.util.ArrayDeque;\\nimport java.util.Deque;\\npublic class Main { public static void main(String[] args) { Deque<String> d = new ArrayDeque<>(); d.add(\"a\"); d.addFirst(\"b\"); d.addLast(\"c\"); System.out.println(d); } }",
        options: ["[a, b, c]","[c, a, b]","[b, a, c]","[a, c, b]"],
        answer: "[b, a, c]",
        explanation: "addFirst pushes to front; addLast to back: [b,a,c]."
      },
      {
        id: 24,
        question: "What is the result of running this Java program?\\npublic class Main { public static void main(String[] args) throws InterruptedException { Thread t = new Thread(() -> System.out.print('Run ')); t.start(); t.join(); System.out.print('End'); } }",
        options: ["Run End","End Run","Either A or B","Compilation Error"],
        answer: "Run End",
        explanation: "join waits for thread completion before printing End."
      },
      {
        id: 25,
        question: "What does this Java code print?\\npublic class Main { public static void main(String[] args) { int x = 1, y = 1; if (x++ < 2 || y++ < 2) { System.out.println(\"x=\" + x + \", y=\" + y); } } }",
        options: ["x=2, y=1","x=2, y=2","x=1, y=2","x=1, y=1"],
        answer: "x=2, y=1",
        explanation: "Short-circuit OR prevents evaluating y++ when left side is true."
      },
      {
        id: 26,
        question: "What will be the output of the following Java program?\\nclass X { X() { System.out.print(\"X\"); } }\\nclass Y extends X { Y() { super(); System.out.print(\"Y\"); } }\\npublic class Main { public static void main(String[] args) { new Y(); } }",
        options: ["YX","XY","X","Y"],
        answer: "XY",
        explanation: "super() runs first printing X, then Y constructor prints Y."
      },
      {
        id: 27,
        question: "What is the output of this program?\\npublic class Main { public static void main(String[] args) { Integer i1 = Integer.valueOf(\"127\"); Integer i2 = Integer.valueOf(\"127\"); System.out.print(i1 == i2); } }",
        options: ["true","false","Compilation Error","An exception is thrown"],
        answer: "true",
        explanation: "Integer.valueOf caches -128..127, so references are identical."
      },
      {
        id: 28,
        question: "What will be printed by this Java code?\\nimport java.util.stream.Collectors;\\nimport java.util.stream.Stream;\\npublic class Main { public static void main(String args[]) { System.out.println(Stream.of(1,1,2,3,3).collect(Collectors.toSet())); } }",
        options: ["[1, 1, 2, 3, 3]","[1, 2, 3]","[3, 2, 1]","The output order is not guaranteed, but will contain 1, 2, 3"],
        answer: "The output order is not guaranteed, but will contain 1, 2, 3",
        explanation: "toSet collects unique elements with unspecified order."
      },
      {
        id: 29,
        question: "What is the output of this code?\\npublic class Main { public static void main(String[] args) { String s1 = \"a\"; final String s2 = \"a\"; String s3 = s1 + \"\"; String s4 = s2 + \"\"; System.out.println(s3 == \"a\"); System.out.println(s4 == \"a\"); } }",
        options: ["true true","false false","true false","false true"],
        answer: "false true",
        explanation: "Non-final concat at runtime vs compile-time constant folding for final."
      },
      {
        id: 30,
        question: "What does the following Java code output?\\npublic class Main { public static void main(String[] args) { System.out.println(10.0 / 0.0); System.out.println(-10.0 / 0.0); System.out.println(0.0 / 0.0); } }",
        options: ["Infinity -Infinity NaN","Infinity Infinity NaN","ArithmeticException","0.0 -0.0 0.0"],
        answer: "Infinity -Infinity NaN",
        explanation: "IEEE-754 semantics for floating division by zero."
      },
      {
        id: 31,
        question: "What is the result of this SQL query?\\nSELECT 'Alpha' WHERE NULL;",
        options: ["'Alpha'","NULL","An empty result set","An error"],
        answer: "An empty result set",
        explanation: "WHERE NULL is unknown/false so zero rows returned."
      },
      {
        id: 32,
        question: "What is the purpose of the following SQL query?\\nSELECT Name, Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) as Rank FROM Employees;",
        options: ["It assigns a unique rank to each employee.","It assigns a rank to each employee, with gaps for ties.","It assigns a rank to each employee, with no gaps for ties.","It finds the densest concentration of salaries."],
        answer: "It assigns a rank to each employee, with no gaps for ties.",
        explanation: "DENSE_RANK doesn't leave gaps when ties occur."
      },
      {
        id: 33,
        question: "What will this SQL query do?\\nINSERT INTO Customers (ID, Name) VALUES (1, 'Alice') ON CONFLICT (ID) DO UPDATE SET Name = 'Alice_Updated';",
        options: ["It will always insert a new customer named 'Alice'.","It will insert 'Alice' if ID 1 does not exist, otherwise it will update the name for ID 1.","It will update the name for ID 1 only if the current name is 'Alice'.","This is not valid standard SQL syntax."],
        answer: "It will insert 'Alice' if ID 1 does not exist, otherwise it will update the name for ID 1.",
        explanation: "Upsert clause inserts or updates on conflict of ID (PostgreSQL/SQLite)."
      },
      {
        id: 34,
        question: "What will be the output of this SQL query?\\nSELECT REPLACE('ababab', 'ab', 'c');",
        options: ["cabab","c","ccc","ababab"],
        answer: "ccc",
        explanation: "All occurrences replaced, 3 'ab' => 'ccc'."
      },
      {
        id: 35,
        question: "A table Logs has a LogTime (datetime) column. What does this query find?\\nSELECT * FROM Logs WHERE LogTime BETWEEN '2024-10-01' AND '2024-10-31 23:59:59';",
        options: ["All logs from the month of October 2024.","All logs from October 1st and October 31st only.","All logs from October 2nd to October 30th.","It produces a syntax error."],
        answer: "All logs from the month of October 2024.",
        explanation: "BETWEEN is inclusive, covering entire month range."
      },
      {
        id: 36,
        question: "What is the purpose of this SQL code?\\nGRANT SELECT, INSERT ON Employees TO 'some_user';",
        options: ["To create a new user named 'some_user'.","To give an existing user, 'some_user', permission to read and add data to the Employees table.","To copy the Employees table to a user's private schema.","To select all data inserted by 'some_user'."],
        answer: "To give an existing user, 'some_user', permission to read and add data to the Employees table.",
        explanation: "GRANT assigns privileges; it doesn't create users."
      },
      {
        id: 37,
        question: "What does the following recursive C++ function do?\\n#include <iostream>\\n#include <string>\\nstd::string convert(int n) { if (n == 0) return \"\"; return convert(n / 8) + std::to_string(n % 8); }\\nint main() { std::cout << convert(75); return 0; }",
        options: ["Prints the binary representation of n.","Prints the octal (base-8) representation of n.","Prints n in reverse.","Prints the sum of the digits of n."],
        answer: "Prints the octal (base-8) representation of n.",
        explanation: "Recursive division by 8 with remainder builds octal string."
      },
      {
        id: 38,
        question: "What is the output of this C++ code snippet?\\n#include <iostream>\\n#include <string>\\nint main() { std::string s = \"Hello\"; s.push_back('!'); s.pop_back(); s.pop_back(); std::cout << s; return 0; }",
        options: ["Hello","Hell","Hel","Hel!"],
        answer: "Hell",
        explanation: "Add '!' then pop twice removes '!' then 'o' leaving 'Hell'."
      },
      {
        id: 39,
        question: "What is the time complexity of the following algorithm?\\n// arr is an array of size n\\npublic int findMax(int[] arr) { int maxVal = arr[0]; for (int i = 1; i < arr.length; i++) { if (arr[i] > maxVal) { maxVal = arr[i]; } } return maxVal; }",
        options: ["O(1)","O(log n)","O(n)","O(n log n)"],
        answer: "O(n)",
        explanation: "Single pass over array elements => linear time."
      },
      {
        id: 40,
        question: "What does this Java code demonstrate?\\nimport java.util.regex.Pattern;\\npublic class Main { public static void main(String[] args) { boolean matches = Pattern.matches(\"^[a-zA-Z]+$\", \"HelloWorld\"); System.out.println(matches); } }",
        options: ["Checking if a string is a palindrome.","Using a regular expression to validate a string.","Splitting a string into tokens.","Searching for a substring."],
        answer: "Using a regular expression to validate a string.",
        explanation: "Pattern.matches returns true if entire string matches regex."
      },
      {
        id: 41,
        question: "What is the output of the following C code?\\n #include <stdio.h>\\n int main() {\\n char str[] = \"Test\";\\n str[1] = 'a';\\n printf(\"%s\", str);\\n return 0;\\n }",
        options: ["Test","Tast","aest","Compilation Error"],
        answer: "Tast",
        explanation: "Modifiable array updated at index 1 from 'e' to 'a'."
      },
      {
        id: 42,
        question: "What is the output of this C++ program?\\n #include <iostream>\\n int main() {\\n int x = 5;\\n if (x == 5);\\n {\\n std::cout << \"Inside\";\\n }\\n return 0;\\n }",
        options: ["Inside","No output","Compilation Error","A warning is produced, and \"Inside\" is printed."],
        answer: "A warning is produced, and \"Inside\" is printed.",
        explanation: "The semicolon ends the if; following block always executes."
      },
      {
        id: 43,
        question: "What is the output of this Java code snippet?\\n public class Main { public static void main(String[] args) { String s = \"Hello\"; System.out.println(s instanceof String); } }",
        options: ["true","false","Compilation Error","1"],
        answer: "true",
        explanation: "A String object is an instance of String."
      },
      {
        id: 44,
        question: "What will this SQL query return?\\nSELECT * FROM Employees LIMIT 5;",
        options: ["It returns the 5 employees with the highest salaries.","It returns the first 5 employees inserted into the table.","It returns 5 arbitrary employees from the table.","It returns employees with an ID less than or equal to 5."],
        answer: "It returns 5 arbitrary employees from the table.",
        explanation: "Without ORDER BY, row order is not guaranteed."
      },
      {
        id: 45,
        question: "What is the time complexity of a depth-first search (DFS) on a graph with V vertices and E edges?\\nvoid DFS(int u, Graph& g, vector<bool>& visited) { visited[u] = true; for (int v : g.adj[u]) { if (!visited[v]) { DFS(v, g, visited); } } }",
        options: ["O(V^2)","O(E log V)","O(V * E)","O(V + E)"],
        answer: "O(V + E)",
        explanation: "Visits each vertex and edge at most once."
      },
      {
        id: 46,
        question: "Predict the output of this C program.\\n #include <stdio.h>\\n int main() {\\n int x = 10 > 5 ? 1 : 0;\\n printf(\"%d\", x);\\n return 0;\\n }",
        options: ["10","5","1","0"],
        answer: "1",
        explanation: "Ternary picks 1 for true condition."
      },
      {
        id: 47,
        question: "What is the output of the following C++ code?\\n #include <iostream>\\n int main() {\\n std::cout << \"Hi\\0there\";\\n return 0;\\n }",
        options: ["Hi","Hithere","Hi there","Hi\\0there"],
        answer: "Hi",
        explanation: "Printing stops at first NUL terminator in C-string."
      },
      {
        id: 48,
        question: "What is the result of running this Java code?\\n public class Main { public static void main(String[] args) { int x = 5; x += x++; System.out.println(x); } }",
        options: ["10","11","12","6"],
        answer: "10",
        explanation: "Evaluates left then right; adds 5 and 5; assigns 10."
      },
      {
        id: 49,
        question: "What does the following SQL query demonstrate?\\nSELECT Name FROM Employees\\nEXCEPT\\nSELECT Name FROM Managers;",
        options: ["It returns all employees who are also managers.","It returns all employees and all managers.","It returns all employees who are not managers.","It produces a syntax error."],
        answer: "It returns all employees who are not managers.",
        explanation: "EXCEPT returns rows in first SELECT not present in second."
      },
      {
        id: 50,
        question: "What is the purpose of this DSA code?\\npublic boolean isPalindrome(String s) { int left = 0; int right = s.length() - 1; while (left < right) { if (s.charAt(left) != s.charAt(right)) { return false; } left++; right--; } return true; }",
        options: ["To reverse a string.","To check if a string contains another string.","To sort the characters of a string.","To check if a string reads the same forwards and backwards."],
        answer: "To check if a string reads the same forwards and backwards.",
        explanation: "Two-pointer technique checks mirrored characters."
      },
      {
        id: 51,
        question: "What is the output of this C program?\\n #include <stdio.h>\\n int main() {\\n float pi = 3.14159;\\n printf(\"%0.2f\", pi);\\n return 0;\\n }",
        options: ["3.14","3.1","3.14159","03.14"],
        answer: "3.14",
        explanation: "Prints two decimals; rounds to 3.14."
      },
      {
        id: 52,
        question: "What is the output of this C++ program?\\n #include <iostream>\\n int main() {\\n int i = 5;\\n while(i--) {\\n if (i == 2) continue;\\n std::cout << i;\\n }\\n return 0;\\n }",
        options: ["54310","4310","43210","430"],
        answer: "4310",
        explanation: "Skips printing 2 due to continue; prints 4,3,1,0."
      },
      {
        id: 53,
        question: "What is the output of this Java code?\\n public class Main { public static void main(String[] args) { System.out.println(String.join(\"-\", \"A\", \"B\", \"C\")); } }",
        options: ["A,B,C","ABC","A-B-C","[\"A\", \"B\", \"C\"]"],
        answer: "A-B-C",
        explanation: "String.join joins elements with '-' delimiter."
      },
      {
        id: 54,
        question: "What will this SQL query return?\\nSELECT 'Value' FROM Employees WHERE Department = 'Sales'\\nUNION ALL\\nSELECT 'Value' FROM Employees WHERE Department = 'HR';",
        options: ["The string 'Value' once.","The string 'Value' twice.","The string 'Value' for every employee in Sales and HR.","An error."],
        answer: "The string 'Value' for every employee in Sales and HR.",
        explanation: "UNION ALL concatenates rows without deduplication."
      },
      {
        id: 55,
        question: "What data structure is most suitable for implementing a task scheduler where tasks have different priorities?",
        options: ["Stack", "Queue", "Priority Queue", "Linked List"],
        answer: "Priority Queue",
        explanation: "Priority queue dequeues highest priority task first."
      },
      {
        id: 56,
        question: "Predict the output of this C program.\\n #include <stdio.h>\\n int main() {\\n char a[3] = \"ab\";\\n char b[3] = \"ab\";\\n if (a == b)\\n printf(\\Equal\");\\n else\\n printf(\"Not Equal\");\\n return 0;\\n }",
        options: ["Equal","Not Equal","Compilation Error","Undefined Behavior"],
        answer: "Not Equal",
        explanation: "Array names decay to different pointers; addresses differ."
      },
      {
        id: 57,
        question: "What is the output of the following C++ code?\\n #include <iostream>\\n int main() {\\n const char* str = \"Hello\";\\n str = \"World\";\\n std::cout << str;\\n return 0;\\n }",
        options: ["Hello","World","H","Compilation Error"],
        answer: "World",
        explanation: "Pointer can be reassigned to another string literal."
      },
      {
        id: 58,
        question: "What is the result of running this Java code?\\n public class Main { public static void main(String[] args) { System.out.println(\"Result: \" + 10/0); } }",
        options: ["Result: Infinity","Result: 0","Compilation Error","A runtime ArithmeticException is thrown."],
        answer: "A runtime ArithmeticException is thrown.",
        explanation: "Integer division by zero throws ArithmeticException."
      },
      {
        id: 59,
        question: "What does the following SQL statement do?\\nSELECT Name FROM Employees ORDER BY RAND() LIMIT 1;",
        options: ["It selects the employee with the name 'RAND()'.","It selects a random employee from the table.","It sorts employees by name and picks one at random.","This is not valid SQL in most dialects."],
        answer: "It selects a random employee from the table.",
        explanation: "ORDER BY RAND() randomizes order; LIMIT 1 returns one row."
      },
      {
        id: 60,
        question: "What is the purpose of this DSA code?\\n#include <vector>\\n#include <numeric>\\nint kadane(const std::vector<int>& arr) { int max_so_far = 0; int max_ending_here = 0; for (int x : arr) { max_ending_here = max_ending_here + x; if (max_ending_here < 0) { max_ending_here = 0; } if (max_so_far < max_ending_here) { max_so_far = max_ending_here; } } return max_so_far; }",
        options: ["To find the sum of all elements in an array.","To find the maximum element in an array.","To find the largest sum of a contiguous subarray.","To find the longest increasing subsequence."],
        answer: "To find the largest sum of a contiguous subarray.",
        explanation: "Kadane's algorithm computes maximum subarray sum in O(n)."
      }
    ]
  }
  ,
  {
    paperId: "tech-paper6",
    name: "Technical Paper 6 - Mixed Topics",
    duration: 60,
    totalQuestions: 60,
    questions: [
      { id: 1, question: "What is the output of this C program?\\n#include <stdio.h>\\nint main() {\\n int a = 1, b = 1, c;\\n c = a++ + b;\\n printf(\"%d, %d\", a, b);\\n return 0;\\n}", options: ["2, 1","1, 2","2, 2","1, 1"], answer: "2, 1", explanation: "Post-increment uses a's old value in sum, then increments a to 2; b remains 1." },
      { id: 2, question: "What will the following C program print?\\n#include <stdio.h>\\nint main() {\\n char *p;\\n printf(\"%ld\", sizeof(p));\\n return 0;\\n}", options: ["1","2","4 or 8","Compilation Error"], answer: "4 or 8", explanation: "Pointer size is 4 bytes on 32-bit and 8 bytes on 64-bit systems." },
      { id: 3, question: "Predict the output of this C code snippet.\\n#include <stdio.h>\\nint main() {\\n int i = 0;\\n for ( ; i < 3; i++) {\\n static int count = 10;\\n count++;\\n printf(\"%d \", count);\\n }\\n return 0;\\n}", options: ["11 12 13","10 11 12","11 11 11","10 10 10"], answer: "11 12 13", explanation: "Static count retains value across loop iterations starting from 10." },
      { id: 4, question: "What is the output of the C code below?\\n#include <stdio.h>\\nint main() {\\n int x = 10, y = 5;\\n if (x = y) {\\n printf(\"%d\", x);\\n } else {\\n printf(\"0\");\\n }\\n return 0;\\n}", options: ["10","5","0","Compilation Error"], answer: "5", explanation: "x=y assigns 5 to x; non-zero so if branch runs and prints 5." },
      { id: 5, question: "What is the output of this C program?\\n#include <stdio.h>\\nint main() {\\n char s[] = \"String\";\\n printf(\"%c\", s[4]);\\n printf(\"%c\", 4[s]);\\n return 0;\\n}", options: ["ng","nn","gg","Compilation Error"], answer: "nn", explanation: "s[4] and 4[s] both refer to the same element 'n'." },
      { id: 6, question: "What will be printed by the following C code?\\n#include <stdio.h>\\nint main() {\\n int x = 2;\\n x = x << (x + 1);\\n printf(\"%d\", x);\\n return 0;\\n}", options: ["4","8","16","6"], answer: "16", explanation: "2 << 3 equals 16." },
      { id: 7, question: "Predict the output of this C code.\\n#include <stdio.h>\\nint main() {\\n int i;\\n for(i=1; i<=10; i++);\\n printf(\"%d\",i);\\n return 0;\\n}", options: ["10","11","1","12345678910"], answer: "11", explanation: "Empty loop increments i to 11; then prints 11." },
      { id: 8, question: "What is the output of the following program?\\n#include <stdio.h>\\n#define func(x) x * x\\nint main() {\\n int i = func(2 + 3);\\n printf(\"%d\", i);\\n return 0;\\n}", options: ["25","11","13","10"], answer: "11", explanation: "Macro expands to 2 + 3 * 2 + 3 => 2 + 6 + 3 = 11." },
      { id: 9, question: "What is the output of this C program?\\n#include <stdio.h>\\n#include <string.h>\\nint main() {\\n char str[10] = \"Hi\";\\n printf(\"%ld %ld\", sizeof(str), strlen(str));\\n return 0;\\n}", options: ["10 2","2 2","3 2","10 3"], answer: "10 2", explanation: "Array size is 10; string length 'Hi' is 2." },
      { id: 10, question: "What does this C code demonstrate?\\n#include <stdio.h>\\nint main() {\\n char buffer[100];\\n printf(\"Enter a line: \");\\n fgets(buffer, 100, stdin);\\n printf(\"You wrote: %s\", buffer);\\n return 0;\\n}", options: ["Unsafe reading of user input.","Reading a single character from the console.","Safe reading of a line of text, including spaces.","Reading a formatted integer from the user."], answer: "Safe reading of a line of text, including spaces.", explanation: "fgets reads up to size-1 chars including spaces and NUL-terminates." },
      { id: 11, question: "What is the output of the following C++ program?\\n#include <iostream>\\nstruct A { int x; };\\nint main() { A a = {}; std::cout << a.x; return 0; }", options: ["0","1","A garbage value","Compilation Error"], answer: "0", explanation: "Aggregate value-initialization zero-initializes members." },
      { id: 12, question: "Predict the output of this C++ program.\\n#include <iostream>\\nclass MyClass { public: MyClass() { std::cout << \"C\"; } MyClass(int i) { std::cout << i; } };\\nint main() { MyClass arr[2]; MyClass obj(5); return 0; }", options: ["CC5","C5C","5CC","Compilation Error"], answer: "CC5", explanation: "Two default constructions then construction with 5." },
      { id: 13, question: "What is the output of this code snippet?\\n#include <iostream>\\n#include <string_view>\\nint main() { std::string_view sv = \"Hello World\"; sv.remove_prefix(6); std::cout << sv; return 0; }", options: ["Hello","World","Hello World","An exception is thrown"], answer: "World", explanation: "remove_prefix advances the view to 'World'." },
      { id: 14, question: "What does the following C++ program print?\\n#include <iostream>\\nstruct A { ~A() { std::cout << \"Destruct\"; } };\\nint main() { A* a = new A(); return 0; }", options: ["Destruct","No output","Compilation Error","Runtime Error"], answer: "No output", explanation: "No delete, so destructor not called; memory leak." },
      { id: 15, question: "What is the output of this C++ program?\\n#include <iostream>\\n#include <vector>\\n#include <algorithm>\\nint main() { std::vector<int> v = {1, 2, 3}; std::rotate(v.begin(), v.begin() + 1, v.end()); for(int x : v) std::cout << x; return 0; }", options: ["123","321","231","312"], answer: "231", explanation: "Left rotate by one: {1,2,3} -> {2,3,1}." },
      { id: 16, question: "What is the output of this C++ program?\\n#include <iostream>\\nclass A { public: int x; A(int i = 0) : x(i) {} };\\nint main() { A a; A b = 10; std::cout << b.x; return 0; }", options: ["0","10","A memory address","Compilation Error"], answer: "10", explanation: "Conversion constructor initializes b.x to 10." },
      { id: 17, question: "Predict the output of the code.\\n#include <iostream>\\nint main() { char s[] = \"abc\"; std::cout << sizeof(s); return 0; }", options: ["3","4","8 (size of a pointer)","Implementation-defined"], answer: "4", explanation: "Includes null terminator; array size is 4." },
      { id: 18, question: "What is the output of the following C++ code?\\n#include <iostream>\\n#include <tuple>\\nint main() { auto my_tuple = std::make_tuple(\"hello\", 10); std::cout << std::get<0>(my_tuple); return 0; }", options: ["hello","10","An exception is thrown","Compilation Error"], answer: "hello", explanation: "std::get<0> accesses first element." },
      { id: 19, question: "What is the output of the program?\\n#include <iostream>\\nint main() { int i = 1; if (++i == 2) std::cout << \"A\"; if (i++ == 2) std::cout << \"B\"; if (i == 3) std::cout << \"C\"; return 0; }", options: ["A","B","C","ABC"], answer: "ABC", explanation: "All three conditions are true in sequence." },
      { id: 20, question: "What is the result of running this C++ code?\\n#include <iostream>\\nstruct MyStruct { MyStruct() { std::cout << \"C\"; } MyStruct(const MyStruct&) = delete; };\\nMyStruct func() { return MyStruct(); }\\nint main() { MyStruct s = func(); return 0; }", options: ["C","No output","Runtime Error","Compilation Error"], answer: "C", explanation: "Guaranteed copy elision constructs directly; deleted copy not used." },
      { id: 21, question: "What is the output of this Java program?\\npublic class Main { public static void main(String[] args) { short s = 10; s = s + 5; System.out.println(s); } }", options: ["15","10","An exception is thrown","Compilation Error"], answer: "Compilation Error", explanation: "s+5 promotes to int; narrowing assignment to short requires a cast." },
      { id: 22, question: "What does the following Java program print?\\npublic class Main { private static void test(int i) { System.out.print(\"I\"); } private static void test(Integer i) { System.out.print(\"W\"); } public static void main(String[] args) { int val = 10; test(val); } }", options: ["I","W","It is ambiguous, Compilation Error","NullPointerException"], answer: "I", explanation: "Overload resolution prefers primitive match over boxing." },
      { id: 23, question: "What is the output of this Java code?\\nimport java.util.ArrayDeque;\\nimport java.util.Deque;\\npublic class Main { public static void main(String[] args) { Deque<String> d = new ArrayDeque<>(); d.add(\"a\"); d.addFirst(\"b\"); d.addLast(\"c\"); System.out.println(d); } }", options: ["[a, b, c]","[c, a, b]","[b, a, c]","[a, c, b]"], answer: "[b, a, c]", explanation: "addFirst pushes to front; addLast to back: [b,a,c]." },
      { id: 24, question: "What is the result of running this Java program?\\npublic class Main { public static void main(String[] args) throws InterruptedException { Thread t = new Thread(() -> System.out.print(\\\"Run \\\")); t.start(); t.join(); System.out.print(\\\"End\\\"); } }", options: ["Run End","End Run","Either A or B","Compilation Error"], answer: "Run End", explanation: "join waits for thread completion before printing End." },
      { id: 25, question: "What does this Java code print?\\npublic class Main { public static void main(String[] args) { int x = 1, y = 1; if (x++ < 2 || y++ < 2) { System.out.println(\"x=\" + x + \", y=\" + y); } } }", options: ["x=2, y=1","x=2, y=2","x=1, y=2","x=1, y=1"], answer: "x=2, y=1", explanation: "Short-circuit OR prevents evaluating y++ when left side is true." },
      { id: 26, question: "What will be the output of the following Java program?\\nclass X { X() { System.out.print(\"X\"); } }\\nclass Y extends X { Y() { super(); System.out.print(\"Y\"); } }\\npublic class Main { public static void main(String[] args) { new Y(); } }", options: ["YX","XY","X","Y"], answer: "XY", explanation: "super() runs first printing X, then Y constructor prints Y." },
      { id: 27, question: "What is the output of this program?\\npublic class Main { public static void main(String[] args) { Integer i1 = Integer.valueOf(\"127\"); Integer i2 = Integer.valueOf(\"127\"); System.out.print(i1 == i2); } }", options: ["true","false","Compilation Error","An exception is thrown"], answer: "true", explanation: "Integer.valueOf caches -128..127, so references are identical." },
      { id: 28, question: "What will be printed by this Java code?\\nimport java.util.stream.Collectors;\\nimport java.util.stream.Stream;\\npublic class Main { public static void main(String args[]) { System.out.println(Stream.of(1,1,2,3,3).collect(Collectors.toSet())); } }", options: ["[1, 1, 2, 3, 3]","[1, 2, 3]","[3, 2, 1]","The output order is not guaranteed, but will contain 1, 2, 3"], answer: "The output order is not guaranteed, but will contain 1, 2, 3", explanation: "toSet collects unique elements with unspecified order." },
      { id: 29, question: "What is the output of this code?\\npublic class Main { public static void main(String[] args) { String s1 = \"a\"; final String s2 = \"a\"; String s3 = s1 + \"\"; String s4 = s2 + \"\"; System.out.println(s3 == \"a\"); System.out.println(s4 == \"a\"); } }", options: ["true true","false false","true false","false true"], answer: "false true", explanation: "Non-final concat at runtime vs compile-time constant folding for final." },
      { id: 30, question: "What does the following Java code output?\\npublic class Main { public static void main(String[] args) { System.out.println(10.0 / 0.0); System.out.println(-10.0 / 0.0); System.out.println(0.0 / 0.0); } }", options: ["Infinity -Infinity NaN","Infinity Infinity NaN","ArithmeticException","0.0 -0.0 0.0"], answer: "Infinity -Infinity NaN", explanation: "IEEE-754 semantics for floating division by zero." },
      { id: 31, question: "What is the result of this SQL query?\\nSELECT 'Alpha' WHERE NULL;", options: ["'Alpha'","NULL","An empty result set","An error"], answer: "An empty result set", explanation: "WHERE NULL is unknown/false so zero rows returned." },
      { id: 32, question: "What is the purpose of the following SQL query?\\nSELECT Name, Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) as Rank FROM Employees;", options: ["It assigns a unique rank to each employee.","It assigns a rank to each employee, with gaps for ties.","It assigns a rank to each employee, with no gaps for ties.","It finds the densest concentration of salaries."], answer: "It assigns a rank to each employee, with no gaps for ties.", explanation: "DENSE_RANK doesn't leave gaps when ties occur." },
      { id: 33, question: "What will this SQL query do?\\nINSERT INTO Customers (ID, Name) VALUES (1, 'Alice') ON CONFLICT (ID) DO UPDATE SET Name = 'Alice_Updated';", options: ["It will always insert a new customer named 'Alice'.","It will insert 'Alice' if ID 1 does not exist, otherwise it will update the name for ID 1.","It will update the name for ID 1 only if the current name is 'Alice'.","This is not valid standard SQL syntax."], answer: "It will insert 'Alice' if ID 1 does not exist, otherwise it will update the name for ID 1.", explanation: "Upsert clause inserts or updates on conflict of ID (PostgreSQL/SQLite)." },
      { id: 34, question: "What will be the output of this SQL query?\\nSELECT REPLACE('ababab', 'ab', 'c');", options: ["cabab","c","ccc","ababab"], answer: "ccc", explanation: "All occurrences replaced, 3 'ab' => 'ccc'." },
      { id: 35, question: "A table Logs has a LogTime (datetime) column. What does this query find?\\nSELECT * FROM Logs WHERE LogTime BETWEEN '2024-10-01' AND '2024-10-31 23:59:59';", options: ["All logs from the month of October 2024.","All logs from October 1st and October 31st only.","All logs from October 2nd to October 30th.","It produces a syntax error."], answer: "All logs from the month of October 2024.", explanation: "BETWEEN is inclusive, covering entire month range." },
      { id: 36, question: "What is the purpose of this SQL code?\\nGRANT SELECT, INSERT ON Employees TO 'some_user';", options: ["To create a new user named 'some_user'.","To give an existing user, 'some_user', permission to read and add data to the Employees table.","To copy the Employees table to a user's private schema.","To select all data inserted by 'some_user'."], answer: "To give an existing user, 'some_user', permission to read and add data to the Employees table.", explanation: "GRANT assigns privileges; it doesn't create users." },
      { id: 37, question: "What does the following recursive C++ function do?\\n#include <iostream>\\n#include <string>\\nstd::string convert(int n) { if (n == 0) return \"\"; return convert(n / 8) + std::to_string(n % 8); }\\nint main() { std::cout << convert(75); return 0; }", options: ["Prints the binary representation of n.","Prints the octal (base-8) representation of n.","Prints n in reverse.","Prints the sum of the digits of n."], answer: "Prints the octal (base-8) representation of n.", explanation: "Recursive division by 8 with remainder builds octal string." },
      { id: 38, question: "What is the output of this C++ code snippet?\\n#include <iostream>\\n#include <string>\\nint main() { std::string s = \"Hello\"; s.push_back('!'); s.pop_back(); s.pop_back(); std::cout << s; return 0; }", options: ["Hello","Hell","Hel","Hel!"], answer: "Hell", explanation: "Add '!' then pop twice removes '!' then 'o' leaving 'Hell'." },
      { id: 39, question: "What is the time complexity of the following algorithm?\\n// arr is an array of size n\\npublic int findMax(int[] arr) { int maxVal = arr[0]; for (int i = 1; i < arr.length; i++) { if (arr[i] > maxVal) { maxVal = arr[i]; } } return maxVal; }", options: ["O(1)","O(log n)","O(n)","O(n log n)"], answer: "O(n)", explanation: "Single pass over array elements => linear time." },
      { id: 40, question: "What does this Java code demonstrate?\\nimport java.util.regex.Pattern;\\npublic class Main { public static void main(String[] args) { boolean matches = Pattern.matches(\"^[a-zA-Z]+$\", \"HelloWorld\"); System.out.println(matches); } }", options: ["Checking if a string is a palindrome.","Using a regular expression to validate a string.","Splitting a string into tokens.","Searching for a substring."], answer: "Using a regular expression to validate a string.", explanation: "Pattern.matches returns true if entire string matches regex." },
      { id: 41, question: "What is the output of the following C code?\\n #include <stdio.h>\\n int main() {\\n char str[] = \"Test\";\\n str[1] = 'a';\\n printf(\"%s\", str);\\n return 0;\\n }", options: ["Test","Tast","aest","Compilation Error"], answer: "Tast", explanation: "Modifiable array updated at index 1 from 'e' to 'a'." },
      { id: 42, question: "What is the output of this C++ program?\\n #include <iostream>\\n int main() {\\n int x = 5;\\n if (x == 5);\\n {\\n std::cout << \"Inside\";\\n }\\n return 0;\\n }", options: ["Inside","No output","Compilation Error","A warning is produced, and \"Inside\" is printed."], answer: "A warning is produced, and \"Inside\" is printed.", explanation: "The semicolon ends the if; following block always executes." },
      { id: 43, question: "What is the output of this Java code snippet?\\n public class Main { public static void main(String[] args) { String s = \"Hello\"; System.out.println(s instanceof String); } }", options: ["true","false","Compilation Error","1"], answer: "true", explanation: "A String object is an instance of String." },
      { id: 44, question: "What will this SQL query do?\\nSELECT * FROM Employees LIMIT 5;", options: ["It returns the 5 employees with the highest salaries.","It returns the first 5 employees inserted into the table.","It returns 5 arbitrary employees from the table.","It returns employees with an ID less than or equal to 5."], answer: "It returns 5 arbitrary employees from the table.", explanation: "Without ORDER BY, row order is not guaranteed." },
      { id: 45, question: "What is the time complexity of a depth-first search (DFS) on a graph with V vertices and E edges?\\nvoid DFS(int u, Graph& g, vector<bool>& visited) { visited[u] = true; for (int v : g.adj[u]) { if (!visited[v]) { DFS(v, g, visited); } } }", options: ["O(V^2)","O(E log V)","O(V * E)","O(V + E)"], answer: "O(V + E)", explanation: "Visits each vertex and edge at most once." },
      { id: 46, question: "Predict the output of this C program.\\n #include <stdio.h>\\n int main() {\\n int x = 10 > 5 ? 1 : 0;\\n printf(\"%d\", x);\\n return 0;\\n }", options: ["10","5","1","0"], answer: "1", explanation: "Ternary picks 1 for true condition." },
      { id: 47, question: "What is the output of the following C++ code?\\n #include <iostream>\\n int main() {\\n std::cout << \"Hi\\0there\";\\n return 0;\\n }", options: ["Hi","Hithere","Hi there","Hi\\0there"], answer: "Hi", explanation: "Printing stops at first NUL terminator in C-string." },
      { id: 48, question: "What is the result of running this Java code?\\n public class Main { public static void main(String[] args) { int x = 5; x += x++; System.out.println(x); } }", options: ["10","11","12","6"], answer: "10", explanation: "Evaluates left then right; adds 5 and 5; assigns 10." },
      { id: 49, question: "What does the following SQL query demonstrate?\\nSELECT Name FROM Employees\\nEXCEPT\\nSELECT Name FROM Managers;", options: ["It returns all employees who are also managers.","It returns all employees and all managers.","It returns all employees who are not managers.","It produces a syntax error."], answer: "It returns all employees who are not managers.", explanation: "EXCEPT returns rows in first SELECT not present in second." },
      { id: 50, question: "What is the purpose of this DSA code?\\npublic boolean isPalindrome(String s) { int left = 0; int right = s.length() - 1; while (left < right) { if (s.charAt(left) != s.charAt(right)) { return false; } left++; right--; } return true; }", options: ["To reverse a string.","To check if a string contains another string.","To sort the characters of a string.","To check if a string reads the same forwards and backwards."], answer: "To check if a string reads the same forwards and backwards.", explanation: "Two-pointer technique checks mirrored characters." },
      { id: 51, question: "What is the output of this C program?\\n #include <stdio.h>\\n int main() {\\n float pi = 3.14159;\\n printf(\"%0.2f\", pi);\\n return 0;\\n }", options: ["3.14","3.1","3.14159","03.14"], answer: "3.14", explanation: "Prints two decimals; rounds to 3.14." },
      { id: 52, question: "What is the output of this C++ program?\\n #include <iostream>\\n int main() {\\n int i = 5;\\n while(i--) {\\n if (i == 2) continue;\\n std::cout << i;\\n }\\n return 0;\\n }", options: ["54310","4310","43210","430"], answer: "4310", explanation: "Skips printing 2 due to continue; prints 4,3,1,0." },
      { id: 53, question: "What is the output of this Java code?\\n public class Main { public static void main(String[] args) { System.out.println(String.join(\"-\", \"A\", \"B\", \"C\")); } }", options: ["A,B,C","ABC","A-B-C","[\"A\", \"B\", \"C\"]"], answer: "A-B-C", explanation: "String.join joins elements with '-' delimiter." },
      { id: 54, question: "What will this SQL query return?\\nSELECT 'Value' FROM Employees WHERE Department = 'Sales'\\nUNION ALL\\nSELECT 'Value' FROM Employees WHERE Department = 'HR';", options: ["The string 'Value' once.","The string 'Value' twice.","The string 'Value' for every employee in Sales and HR.","An error."], answer: "The string 'Value' for every employee in Sales and HR.", explanation: "UNION ALL concatenates rows without deduplication." },
      { id: 55, question: "What data structure is commonly implemented using an array and follows the rule that for any element at index i, its left child is at 2*i + 1 and its right child is at 2*i + 2?", options: ["Binary Search Tree","Stack","Binary Heap","Hash Table"], answer: "Binary Heap", explanation: "Array-based representation of a complete binary tree." },
      { id: 56, question: "Predict the output of this C program.\\n #include <stdio.h>\\n int main() {\\n char a[3] = \"ab\";\\n char b[3] = \"ab\";\\n if (a == b)\\n printf(\"Equal\");\\n else\\n printf(\"Not Equal\");\\n return 0;\\n }", options: ["Equal","Not Equal","Compilation Error","Undefined Behavior"], answer: "Not Equal", explanation: "Array names decay to different pointers; addresses differ." },
      { id: 57, question: "What is the output of the following C++ code?\\n #include <iostream>\\n int main() {\\n const char* str = \"Hello\";\\n str = \"World\";\\n std::cout << str;\\n return 0;\\n }", options: ["Hello","World","H","Compilation Error"], answer: "World", explanation: "Pointer can be reassigned to another string literal." },
      { id: 58, question: "What is the result of running this Java code?\\n public class Main { public static void main(String[] args) { System.out.println(\"Result: \" + 10/0); } }", options: ["Result: Infinity","Result: 0","Compilation Error","A runtime ArithmeticException is thrown."], answer: "A runtime ArithmeticException is thrown.", explanation: "Integer division by zero throws ArithmeticException." },
      { id: 59, question: "What does the following SQL statement do?\\nSELECT Name FROM Employees ORDER BY RAND() LIMIT 1;", options: ["It selects the employee with the name 'RAND()'.","It selects a random employee from the table.","It sorts employees by name and picks one at random.","This is not valid SQL in most dialects."], answer: "It selects a random employee from the table.", explanation: "ORDER BY RAND() randomizes order; LIMIT 1 returns one row." },
      { id: 60, question: "What is the purpose of this DSA code?\\n#include <vector>\\n#include <numeric>\\nint kadane(const std::vector<int>& arr) { int max_so_far = 0; int max_ending_here = 0; for (int x : arr) { max_ending_here = max_ending_here + x; if (max_ending_here < 0) { max_ending_here = 0; } if (max_so_far < max_ending_here) { max_so_far = max_ending_here; } } return max_so_far; }", options: ["To find the sum of all elements in an array.","To find the maximum element in an array.","To find the largest sum of a contiguous subarray.","To find the longest increasing subsequence."], answer: "To find the largest sum of a contiguous subarray.", explanation: "Kadane's algorithm computes maximum subarray sum in O(n)." }
    ]
  }
];

export const getTechnicalPaperSet1 = () => technicalPapers[0];
export const getTechnicalPaperSet2 = () => technicalPapers[1];
export const getTechnicalPaperSet3 = () => technicalPapers[2];
export const getTechnicalPaperSet4 = () => technicalPapers[3];
export const getTechnicalPaperSet5 = () => technicalPapers[4];
export const getTechnicalPaperSet6 = () => technicalPapers[5];

export const getRandomTechnicalPaper = () => {
  const idx = Math.floor(Math.random() * technicalPapers.length);
  return technicalPapers[idx];
};
