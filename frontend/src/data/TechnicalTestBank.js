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
        question: "What will be the output of the following C code? int a = 5; int b = a++ + ++a;",
        options: ["10", "11", "12", "Undefined Behavior"],
        answer: "Undefined Behavior",
        explanation: "a is modified more than once between sequence points (a++ and ++a) in one expression, which is undefined behavior by the C standard."
      },
      {
        question: "Predict the output: int arr[] = {10,20,30,40,50}; int *ptr = arr; printf(\"%d\", *(ptr++ + 2));",
        options: ["30", "20", "Compiler Error", "Garbage Value"],
        answer: "30",
        explanation: "ptr is used before post-increment; *(arr + 2) yields arr[2] which is 30, then ptr increments to arr+1."
      },
      {
        question: "What is the output of C code: printf(\"%d\", sizeof(void));",
        options: ["0", "1", "2", "Compiler Error"],
        answer: "Compiler Error",
        explanation: "sizeof(void) is invalid; void is an incomplete type. sizeof(void*) is valid."
      },
      {
        question: "Macro PRODUCT defined as #define PRODUCT(x) (x*x). What is PRODUCT(i+1) when i=3?",
        options: ["16", "10", "7", "12"],
        answer: "7",
        explanation: "Expands to (i+1*i+1). Due to precedence, 3 + 3 + 1 = 7. Proper macro should be ((x)*(x))."
      },
      {
        question: "How many times will 'Hello' be printed? for(i=0;i<5;i++); printf(\"Hello\");",
        options: ["5 times", "1 time", "0 times", "Compiler Error"],
        answer: "1 time",
        explanation: "The semicolon terminates the loop; printf executes once after the loop."
      },
      {
        question: "Output: char str[]=\"C-Program\"; printf(\"%s %s\\n\", str, str+2);",
        options: ["C-Program C-Program", "C-Program -Program", "C- -Program", "Compiler Error"],
        answer: "C-Program -Program",
        explanation: "str prints whole string; str+2 prints from third character '-'."
      },
      {
        question: "In C, if you pass an array as a function argument, what is actually passed?",
        options: ["The first element of the array", "The base address of the array", "A copy of the array", "The size of the array"],
        answer: "The base address of the array",
        explanation: "Arrays decay to pointers to their first element when passed to functions."
      },
      {
        question: "Purpose of static keyword for a local variable in a function?",
        options: ["Visible outside the function", "Allocated on heap", "Preserves value between calls", "Prevents modification"],
        answer: "Preserves value between calls",
        explanation: "Static locals retain value across function invocations and are initialized once."
      },
      {
        question: "What is a dangling pointer?",
        options: ["Uninitialized pointer", "Pointer to NULL", "Pointer to freed memory", "Pointer to array start"],
        answer: "Pointer to freed memory",
        explanation: "Pointer referencing memory that has been deallocated or gone out of scope."
      },
      {
        question: "C code: int x=10; float y=10.0; if(x==y) ... Output?",
        options: ["Equal", "Not Equal", "Compiler Error", "No output"],
        answer: "Equal",
        explanation: "x is promoted to float; 10.0 == 10.0 is true."
      },
      {
        question: "Size of a union?",
        options: ["Sum of sizes", "Size of largest member", "Size of smallest member", "Always 4 bytes"],
        answer: "Size of largest member",
        explanation: "Union allocates enough memory to hold its largest member; members overlay."
      },
      {
        question: "volatile keyword signifies?",
        options: ["Cannot be modified", "May change outside compiler control", "Stored in register", "Is a constant"],
        answer: "May change outside compiler control",
        explanation: "Signals to avoid optimizations; read from memory each access."
      },
      {
        question: "Open file for reading and writing in binary mode (create/truncate)?",
        options: ["fopen(\"file.bin\", \"rw\");", "fopen(\"file.bin\", \"wb+\");", "fopen(\"file.bin\", \"r+w\");", "fopen(\"file.bin\", \"ab\");"],
        answer: "fopen(\"file.bin\", \"wb+\");",
        explanation: "wb+ opens for read/write in binary, creating/truncating."
      },
      {
        question: "Output: int a=1,b=1,c; c=a++ + b; printf(\"a=%d,b=%d,c=%d\");",
        options: ["a = 2, b = 1, c = 2", "a = 1, b = 1, c = 2", "a = 2, b = 1, c = 3", "a = 1, b = 2, c = 2"],
        answer: "a = 2, b = 1, c = 2",
        explanation: "Post-increment uses a=1 then increments to 2; c=1+1=2."
      },
      {
        question: "Predict output: int x=5; printf(\"%d %d %d\\n\", x, x<<1, x>>1);",
        options: ["5 10 2", "2 10 5", "Compiler-dependent", "5 2 10"],
        answer: "Compiler-dependent",
        explanation: "Order of evaluation of function arguments is unspecified in C."
      },
      {
        question: "Role of extern keyword?",
        options: ["Declares without defining", "Gives static storage", "Makes variable file-local", "Initializes to zero"],
        answer: "Declares without defining",
        explanation: "extern declares a variable defined elsewhere (another translation unit)."
      },
      {
        question: "typedef does what?",
        options: ["Creates a new type", "Creates alias for an existing type", "Defines a new variable", "Declares a function"],
        answer: "Creates alias for an existing type",
        explanation: "typedef introduces an alias name for an existing type."
      },
      {
        question: "Value of x after: int x=10; x = x++;",
        options: ["10", "11", "9", "Undefined Behavior"],
        answer: "Undefined Behavior",
        explanation: "x is modified more than once without a sequence point; undefined in C."
      },
      {
        question: "Difference between malloc() and calloc()?",
        options: ["malloc for single, calloc for multiple", "malloc zero-initializes", "calloc zero-initializes", "No difference"],
        answer: "calloc zero-initializes",
        explanation: "calloc initializes allocated memory to zero; malloc leaves it uninitialized."
      },
      {
        question: "switch without breaks: x=3 prints?",
        options: ["Three", "Three Default", "Three Four Default", "Compiler Error"],
        answer: "Three Four Default",
        explanation: "Fall-through from case 3 to case 4 to default prints all of them."
      },
      {
        question: "Pointer pointing to NOTHING is a ____ pointer.",
        options: ["VOID", "DANGLING", "NULL", "WILD"],
        answer: "NULL",
        explanation: "NULL denotes a pointer that points to no valid object."
      },
      {
        question: "Correct signature of main with command-line args?",
        options: ["int main(int argv, char *argc)", "int main(char *argv[], int argc)", "int main(int argc, char *argv[])", "int main(char argc, int *argv)"],
        answer: "int main(int argc, char *argv[])",
        explanation: "argc = count, argv = array of pointers to C-strings."
      },
      {
        question: "Endianness refers to?",
        options: ["Order of bits in a byte", "Order of bytes in multi-byte types", "Floating-point representation", "Max integer value"],
        answer: "Order of bytes in multi-byte types",
        explanation: "Big-endian stores MSB first; little-endian stores LSB first at lower addresses."
      },
      {
        question: "Header for strcmp()?",
        options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<conio.h>"],
        answer: "<string.h>",
        explanation: "String comparison function strcmp is declared in <string.h>."
      },
      {
        question: "Output: float f=0.1; if (f == 0.1) ...",
        options: ["Equal", "Not Equal", "Sometimes Equal, sometimes Not Equal", "Compiler Error"],
        answer: "Not Equal",
        explanation: "0.1 literal is double; comparing float to double often fails due to precision."
      },
      {
        question: "C++ virtual dispatch: Base* b = new Derived(); b->show();",
        options: ["Base", "Derived", "Compiler Error", "Runtime Error"],
        answer: "Derived",
        explanation: "show is virtual; call resolves to Derived::show via dynamic dispatch."
      },
      {
        question: "Construct/destruct order with Child derived from Parent, object Child c;",
        options: ["Parent Constructor Child Constructor Parent Destructor Child Destructor", "Child Constructor Parent Constructor Child Destructor Parent Destructor", "Parent Constructor Child Constructor Child Destructor Parent Destructor", "Child Constructor Parent Constructor Parent Destructor Child Destructor"],
        answer: "Parent Constructor Child Constructor Child Destructor Parent Destructor",
        explanation: "Base constructed first, then derived; destruction in reverse order."
      },
      {
        question: "Two functions same name different parameters in same class demonstrates?",
        options: ["Function Overriding", "Function Overloading", "Operator Overloading", "Polymorphism"],
        answer: "Function Overloading",
        explanation: "Overloading = same name, different signatures, resolved at compile time."
      },
      {
        question: "Issue in: MyClass* p = new MyClass[2]; delete p;",
        options: ["No issue", "Compile-time error", "Memory leak and undefined behavior", "Prints Destructed twice"],
        answer: "Memory leak and undefined behavior",
        explanation: "Must use delete[] for arrays; delete calls only first destructor."
      },
      {
        question: "std::vector<int>::size() returns?",
        options: ["Number of elements", "Capacity before reallocation", "Size in bytes", "Pointer to last element"],
        answer: "Number of elements",
        explanation: "size() is count of elements; capacity() is reserved space."
      },
      {
        question: "Primary difference between struct and class in C++?",
        options: ["struct members public by default; class members private by default", "struct cannot have member functions", "struct is value type; class is reference type", "No difference"],
        answer: "struct members public by default; class members private by default",
        explanation: "Default access differs; otherwise largely equivalent."
      },
      {
        question: "Output with pass-by-reference modify(int& val){ val=100; } int x=50; modify(x);",
        options: ["50", "100", "Garbage Value", "Compiler Error"],
        answer: "100",
        explanation: "Reference binds to x; function assigns x = 100."
      },
      {
        question: "Role of this pointer?",
        options: ["Points to base class", "Points to current object", "Void pointer to any", "Points to static member"],
        answer: "Points to current object",
        explanation: "Inside non-static member functions, this points to the object instance."
      },
      {
        question: "throw keyword in C++ exception handling does what?",
        options: ["Catches an exception", "Specifies code to test for errors", "Signals an exceptional condition", "Defines handler block"],
        answer: "Signals an exceptional condition",
        explanation: "throw raises an exception to be caught by a matching catch block."
      },
      {
        question: "Smart pointer for exclusive ownership?",
        options: ["std::shared_ptr", "std::weak_ptr", "std::unique_ptr", "std::auto_ptr (deprecated)"],
        answer: "std::unique_ptr",
        explanation: "unique_ptr expresses exclusive ownership and cannot be copied."
      },
      {
        question: "RAII stands for?",
        options: ["Design pattern for managing resources", "Memory allocation technique", "Type of inheritance", "Template metaprogramming technique"],
        answer: "Design pattern for managing resources",
        explanation: "Resource Acquisition Is Initialization ties resource lifetime to object lifetime."
      },
      {
        question: "Output: struct A { A(){cout<<\"A\";} A(const A&){cout<<\"Ac\";} }; A a; func(a);",
        options: ["A", "AAc", "Ac", "AA"],
        answer: "AAc",
        explanation: "Default constructor prints 'A'; pass by value calls copy constructor printing 'Ac'."
      },
      {
        question: "Rule of Three in C++?",
        options: ["Constructor implies empty constructor and destructor", "At most three base classes", "If a class defines destructor/copy ctor/copy assign, it should probably define all three", "A function should not have more than three arguments"],
        answer: "If a class defines destructor/copy ctor/copy assign, it should probably define all three",
        explanation: "Classes managing resources need all three to manage ownership correctly."
      },
      {
        question: "Meaning of const at end of member function: void print() const;",
        options: ["Function returns const value", "Function cannot be overridden", "Function cannot modify member variables", "Function only callable on const objects"],
        answer: "Function cannot modify member variables",
        explanation: "const member functions promise not to change object state."
      },
      {
        question: "What is a V-Table?",
        options: ["Table for variables", "Mechanism to achieve dynamic polymorphism", "Table of contents for class", "Static table shared by all objects"],
        answer: "Mechanism to achieve dynamic polymorphism",
        explanation: "V-Table holds pointers to virtual functions for runtime dispatch."
      },
      {
        question: "C++ vector reference: pushing via reference affects original? std::vector<int>& ref = v; ref.push_back(4); v.size()?",
        options: ["3", "4", "0", "Compiler Error"],
        answer: "4",
        explanation: "ref aliases v; push_back on ref mutates v."
      },
      {
        question: "Static member variables are?",
        options: ["Each object has its own copy", "Only accessed by static member functions", "Shared among all objects", "Initialized by constructor"],
        answer: "Shared among all objects",
        explanation: "Static members belong to class, single storage shared by all instances."
      },
      {
        question: "Function overriding is?",
        options: ["Same name different parameters", "Derived class redefines base virtual function", "Creating a template function", "Deleting a base function"],
        answer: "Derived class redefines base virtual function",
        explanation: "Overriding provides specific implementation in derived class for virtual base method."
      },
      {
        question: "Purpose of friend keyword?",
        options: ["Allow access to private/protected members", "Specify inheritance", "Create alias for class", "Make member variable constant"],
        answer: "Allow access to private/protected members",
        explanation: "friend grants external function/class access to internals of declaring class."
      },
      {
        question: "std::move is used to?",
        options: ["Move a file", "Cast to rvalue reference enabling move semantics", "Reallocate memory", "Copy an object"],
        answer: "Cast to rvalue reference enabling move semantics",
        explanation: "std::move produces an xvalue, enabling move constructors/assignments."
      },
      {
        question: "Difference between delete and delete[]?",
        options: ["delete for pointers, delete[] for arrays", "delete calls one destructor, delete[] calls all", "delete[] is faster", "Both A and B"],
        answer: "Both A and B",
        explanation: "delete for single objects; delete[] for arrays; delete[] calls destructor for each element."
      },
      {
        question: "Which is a sequence container?",
        options: ["std::set", "std::map", "std::vector", "std::unordered_map"],
        answer: "std::vector",
        explanation: "Sequence containers store linear sequences: vector, deque, list, array."
      },
      {
        question: "Lambda expression in C++11 is?",
        options: ["Anonymous function object", "Preprocessor macro", "Variable keyword", "Template specialization"],
        answer: "Anonymous function object",
        explanation: "Lambda creates an unnamed function object, convenient for algorithms."
      },
      {
        question: "Scope resolution operator?",
        options: [".", "->", "&", "::"],
        answer: "::",
        explanation: "Used to qualify names with namespace/class scope, access static members, etc."
      },
      {
        question: "Pure virtual function is?",
        options: ["Virtual function initialized to 0", "Function that cannot be overridden", "Virtual function with no implementation in base", "Callable only from derived"],
        answer: "Virtual function with no implementation in base",
        explanation: "Declared with =0; makes the class abstract."
      },
      {
        question: "Java Strings: s1=\"Java\", s2=new String(\"Java\"), s3=\"Java\"; s1==s2 and s1==s3?",
        options: ["true true", "false true", "true false", "false false"],
        answer: "false true",
        explanation: "s1 in string pool; s2 heap object; s3 same pool literal as s1."
      },
      {
        question: "Java try/catch/finally with division by zero prints?",
        options: ["ACDE", "ABDE", "AC", "ADE"],
        answer: "ACDE",
        explanation: "Prints A, exception triggers catch C, finally D always, then E after block."
      },
      {
        question: "NOT a core OOP concept?",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Procedure"],
        answer: "Procedure",
        explanation: "OOP core includes encapsulation, inheritance, polymorphism, abstraction."
      },
      {
        question: "Difference between abstract class and interface in Java (pre-Java 8)?",
        options: ["Abstract class can have instance variables; interface cannot", "Interface can have constructors", "Class can extend multiple abstract classes", "Abstract class only has abstract methods"],
        answer: "Abstract class can have instance variables; interface cannot",
        explanation: "Pre-Java 8 interfaces had only constants and abstract methods."
      },
      {
        question: "Java ArrayList insertion: list.add(\"A\"); list.add(\"B\"); list.add(1, \"C\"); prints?",
        options: ["[A, B, C]", "[A, C, B]", "[C, A, B]", "[A, B]"],
        answer: "[A, C, B]",
        explanation: "add(index, e) inserts at index, shifting elements to the right."
      },
      {
        question: "Which statement about final in Java is FALSE?",
        options: ["A final class cannot be subclassed", "A final method cannot be overridden", "The value of a final variable cannot be changed", "A final method cannot be overloaded"],
        answer: "A final method cannot be overloaded",
        explanation: "final relates to overriding; overloading is unaffected."
      },
      {
        question: "Default values of uninitialized instance variables int and String?",
        options: ["0 and \"\"", "0 and null", "null and null", "Compilation Error"],
        answer: "0 and null",
        explanation: "Java defaults: numeric primitives to 0, reference types to null."
      },
      {
        question: "Primary purpose of Java garbage collection?",
        options: ["Remove unused classes", "Clean up disk temp files", "Automatically free memory of unreachable objects", "Close unclosed DB connections"],
        answer: "Automatically free memory of unreachable objects",
        explanation: "GC reclaims memory from objects no longer reachable."
      },
      {
        question: "Collection storing key-value pairs with no duplicate keys?",
        options: ["ArrayList", "HashSet", "HashMap", "TreeMap"],
        answer: "HashMap",
        explanation: "HashMap implements Map, stores key-value pairs with unique keys."
      },
      {
        question: "How to create a thread in Java?",
        options: ["Extend Thread or implement Runnable", "Create Process", "Call start() on any Object", "Implement Serializable"],
        answer: "Extend Thread or implement Runnable",
        explanation: "Standard approaches: extend Thread or implement Runnable (preferred)."
      }
    ]
  }
];

export const getTechnicalPaperSet1 = () => technicalPapers[0];

export const getRandomTechnicalPaper = () => {
  const idx = Math.floor(Math.random() * technicalPapers.length);
  return technicalPapers[idx];
};
