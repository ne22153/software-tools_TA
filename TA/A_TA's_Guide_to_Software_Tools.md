##  A TA's Guide to Software Tools (well kinda)
(last updated 17/01/25)

So, you reckon you can be a TA for Software Tools, eh? ~~well think again!~~

This is just a little guide to get you going from week to week, mostly because I got bored. This should remain accruate for as long as Joseph doesn't get bored of the lab sessions.

A lot of this is probably pretty basic, but seems to be sticking points for the new cohorts. It should contain answers to _most_ exercises and spots where a lot of students tend to go wrong.

### Week 1 - System Administration

A big thing for this week is that a lot of students don't really _get_ how the shell or ssh works. So before you try and fix anything, make sure to check whether they are in their personal machine, a lab machine `it######.wks.bris.ac.uk` or the bastion host `seis.bris.ac.uk`. 

#### Secure Shell

If someone is using Windows CMD to connect to the lab machines, they should probably use WSL, as the ssh -J command only works there. 

A common issue is that students won't change the USERNAME section of the ssh command. Make it clear to them that _most of the time_ something in CAPITALS needs to be replaced by the corresponding piece of information.

Command to make new ssh keyset (always handy to have): `ssh-keygen -t ed25519`

To check if keys already exist, make sure to check the `.ssh` folder.

If the student has decided _for some reason_ to rename their key file name, be aware that ssh may struggle to find the right file. This can cause issues.

#### Installing vagrant and Debian

First check, is the person using Mac? Then you need to ~~burn them~~ politely tell them they need to use the lab machines.

For some reason, students sometimes don't read the instructions. This results in their Vagrantfile being incorrect. If they're having issues running `vagrant up`, here are some common causes:
 - They somehow downloaded the wrong Vagrantfile (e.g. they made their own). **Fix**: copy the Vagrantfile from the GitHub into their version
 - Their Vagrantfile is being read as a txt file (this can happen if they download it directly from GitHub). **Fix**: run `mv Vagrantfile.txt Vagrantfile`.

Another common issue is with the VirtualBox versions. The most up to date version of VirtualBox is not supported by Vagrant, and so they need to download v7.0 or earlier. 

Note: as far as I'm aware, vagrant does not work in WSL

#### Debian system administration

Some students may get confused when adding package installation instructions in the lab machine Vagrantfile, just make sure that it is below the line: `echo "Post-provision installs go here"`

### Week 2 - Fundamentals

#### Shell Expansion

**Pattern matching solution:**
 - `cd empty; ../arguments *`
 - `./arguments '*'`
 - `./arguments $'*\a'`

#### File Permissions

We don't tend to get too many issues from this lab, the main thing is just to make sure that they know what user they're signed in as when running certain commands.

#### Shell Scripting

**Compile Helper Exercise solution:**

```
#! /bin/sh
echo $1
if [$1 = "compile"]
then 
    if [$2 != *.c*]
    then
        gcc -Wall -std=c11 -g ${2}.c -o $2
    else
        export STRING=$2 | sed 's/.$//' | sed 's/.$//'
        gcc -Wall -std=c11 -g $2 -o $STRING
    fi
else
    if [$1 = "run"]
    then
        if [$2 = *.c*]
        then
            export STRING=$2 | sed 's/.$//' | sed 's/.$//'
            ./$STRING
        else
            ./$2
        fi
    else
        if [$1 = "build"]
        then
            gcc -Wall -std=c11 -g ${2}.c -o $2
            ./$2
        else
            echo "This command isn't recognised by this program"
        fi
    fi
fi
```

#### Pipes

**Word list exercise solutions:**

 - First word in the file: `head -n 1 words`
 - Last word in the file: `tail -n 1 words`
 - Number of words in the file: `wc -l words`
 - 6171st word in the file: `head -n 6171 words | tail -n 1`
 - First 5 words that are among the last 100 words on the list: `tail -n 100 words | head -n 5`
 - Last 10 words in the file, sorted in reverse: `tail -n 10 words | sort -r`

### Week 3 - Regex

#### Regex

**Grep solutions:**
 - All words containing the letter Q, capitalised: `grep 'Q' words`
 - All words starting with the letter R, in either upper or lower case: `grep -i '^R' words`
 - All words ending in j: `grep 'j$' words`
 - The number of words containing the letter Q, ignoring case: `grep -i 'Q' words | wc -l`
 - The first 5 words containing the sequence "kp" but not "ckp": `grep -i 'kp' words | grep -v 'c'`
 - The last 15 words of exactly 2 letters: `grep '^..$' words | tail -n 15`
 - All 3 letter words with no vowels: `grep '^...$' words | grep -iv '[aeiou]'`
 - All words of exactly 7 letters, where the 3rd one is an e and the word ends in '-ded': `grep '^..e.ded$' words`
 - All words that start with P (not case sensitive), and contain at least 4 instances of a: `grep -i '^P.*a.*a.*a.*a.*' words`

**Sed solutions:**
 - Find all words which end in 'ay', change 'day' into 'week': `grep 'ay$' words | sed 's/day/week/'`
 - Replace all words from the selection above which begin with 's' with the word 'sway': `grep -i 'ay$' words | sed 's/^s\(.*\)/sway/I'` (I makes the sed command case insensitive)
 - Separate the word and the 'day': `grep 'ay$' words | sed 's/day$/& day/'`
 - Replace day with 'X day or X week': `grep -i 'ay$' words | sed 's/day$/\1 day or \1 week/'`
 - Flip the word and parenthesised: `grep -e day$ -e way$ words | sed 's/\(.*\)\(day\|way\)$/\2(\1)/'`

### Week 4 & 5 - Git

#### Git

Make sure the students actually change the IdentityFile line in `~/.ssh/config`

If they're struggling with checking out to main, it may be that their default branch is master.

**MAKE SURE THAT THEY CLONE PRIVATE REPOS WITH SSH:** otherwise they won't be able to edit, as password verification was depricated. To check this you can run `git remote show origin`, ssh will have the structure `git@github.com:USERNAME/REPONAME`.

There are 2 labs for Git, and people seem to forget how they added the keys in the first lab. So if they're having access issues, it's probably because they set up the keys for their local machine, and not the VM.

### Week 6 - Build Tools

This is about the time in the term where the questions calm down ~~thank God~~. 

Just pay attention to which commands are actually _meant_ to be ran, as some are just examples and cause some confusion.

#### Python

Pip causes some issues for people, make sure it is installed before trying to install mistletoe, because otherwise it obviously won't work! (The _amount of times_ I had to fix this this year)

`pip list` is useful to see what python modules are installed

If the students put the python code in a file, it WILL NOT print the markdown result to command line unless they add the print statement themselves.

#### Java

Make sure the students actually set their JAVA_HOME and PATH variables. This can sometimes cause issues if the jdk has a slightly different name.

When adding Thymeleaf as a dependency (or really anything else) make sure you add it to the pom.xml under the general dependencies section, not dependencyManagement.

### Week 7 - Debugging (aka Jo's Birthday Lab)

Now this lab is _something_. Be prepared for people to not know how to use GDB, or how to read assembly. Yahoo!

It is recommended that the students don't look directly at the source file or `solutions.h` (obviously)

#### General solutions

These can also be found in `cheater.sh` on the GitHub

1: `Beetlejuice`
2: `Betelgeuse`
3: `MeSayDay0h`
4: `12345`
5: `z+dddddd++>z+dd+dd+++++d+>c>c<+++++++d>>c>c>c>c>c>c<<<<<<>-------------d>cl----->>++++++++d->---------d->`

#### Crack me 1

Run `ltrace ./crackme-1 <<<';*3$'`, which will return a list of library calls. The notable one is `strcmp(";*3$", "Beetlejuice")` as it's comparing our input with the solution.

#### Crack me 2

Begin debugging the code with `gdb ./crackme-2`

Set a break point at main: `b main`. Then run.

Disassemble the function: `disas`

Here's where the trickier bit comes in. We want to look at the values being held in the accumulator, as `cmp` (like crackme-1) is the key here.

There are 10 occurences where a value is compared to `%al`, which stores the last 8 bits of the value in the accumulator. We want these values, as they can be translated into ASCII to form a string.

Now, the order in which the characters are checked isn't numerical, but we can check which value is being checked by looking at 2 lines before... the index of the character is the value being added to `%rax`. 

#### Crack me 3

(The hint in the source code is in a caesar cipher with shift 13. We learn that the input values are XORed with 0x42 before being compared)

Here, by running `ltrace`, we know that the string doesn't get directly compared.

We can see in the disassembled code that the value of `%edx` is being XORed with 0x42 before being compared.

We also see that the value of rax (which we can see with i r, holds the length of the string) is compared with `0xa`, which translates to 10, so we know the password is 10 characters long.

### Week 8 & 9 - SQL

We have made it to SQL! Yayy

#### Reading an ER diagram

 - Which relationships are mandatory or optional? 
 - - Any relation with a 'circle' on the connection can have a zero value, and hence be optional
 - Which relationships are one-one, one-many, many-many?
 - - one-many: RGroup + Lecturer, Lecturer + Unit
 - - many-many: Student + Unit 
 - How do the above affect the placement of foreign keys? For example, why is the foreign key for 'lecturer beling to research group' on the Lecturer table?
 - - Optional relations mean that foreign key placement can be tricky. You should have foreign keys where you know the entity has to exist

 #### Making an ER diagram

 ![ER Diagram](./er.png)

 #### Implementing a Schema

 ```
 CREATE TABLE IF NOT EXISTS Event (
    Date DATE NOT NULL, 
    Location VARCHAR(20) NOT NULL, 
    Name VARCHAR(20), 
    FORGEIGN KEY (Organiser) REFERENCES Members(Email), 
    PRIMARY KEY (Date, Location)
 );

CREATE TABLE IF NOT EXISTS Member(
    Email VARCHAR(30) NOT NULL PRIMARY KEY, 
    StudentNumber INTEGER, 
    Name VARCHAR(30) NOT NULL, 
    SkillLevel INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Committee(
    Role VARCHAR(30) NOT NULL PRIMARY KEY, 
    FOREIGN KEY (Member) REFERENCES Members(Email)
);
```

#### Easier questions

##### Elections

 - List the names of all parties that stood in the election, ordered alphabetically by name.
 ```
 SELECT Party.name FROM Party
 ORDER BY Party.name
 ```

 - List the names of all parties that stood in the Bedminster ward.
 ```
 SELECT Party.name FROM Candidate
 INNER JOIN Party on Candidate.party = Party.id
 INNER JOIN Ward on Candidate.ward = Ward.id 
 WHERE Ward.name = 'Bedminster'
 ```

 - How many votes did Labour get in the Stockwood ward?
 ``` 
 SELECT Votes FROM Candidate
 INNER JOIN Party ON Candidate.party = Party.id
 INNER JOIN Ward on Candidate.ward = Ward.id 
 WHERE Party.name = 'Labour' AND Ward.name = 'Stockwood'
 ```

 - List the names, parties and number of votes obtained for all candidates in the Southville ward. Order the candidates by number of votes obtained descending (winner comes first).
```
SELECT Candidate.name, Party.name, Candidate.votes FROM Candidate
JOIN Party ON Candidate.party = Party.id
JOIN Ward ON Candidate.ward = Ward.id
WHERE Ward.name = 'Southville'
ORDER BY Votes DESC
```

 - List the name, party and number of votes obtained for the winner only in the Knowle ward.
 ```
SELECT Candidate.name, Party.name, Candidate.votes FROM Candidate
JOIN Party ON Candidate.party = Party.id
JOIN Ward ON Candidate.ward = Ward.id
WHERE Ward.name = 'Knowle'
ORDER BY Votes DESC
LIMIT 1
```

##### Census 
 - The university of Bristol is situated in the Cabot ward (ward names are not always distinct, but this one is). Find the names and codes of the CLU, region and country containing the Cabot ward (CLU = county level unit = "row in County table").

```
SELECT County.name, County.code, Region.name, Country.name
FROM County 
INNER JOIN Country ON County.Country = Country.code
INNER JOIN Region ON County.parent = Region.code
INNER JOIN Ward ON County.code = Ward.parent
WHERE Ward.name = 'Cabot'
```

 - Find the number of women managers in the Cabot ward.
 ```
 SELECT Data
 FROM Statistic
 WHERE Statistic.occId = 1 AND gender = 1 AND wardId = 'E05001979'
 ```
 - For the Stoke Bishop ward, list the 9 occupation class names and the number of men in each occupation. Your table should have two columns called name and number.
```
SELECT Occupation.name AS name, Statistic.data AS number
FROM Statistic 
JOIN Occupation ON Statistic.occId = Occupation.id
WHERE Statistic.gender = 0 AND wardId = 'E05002003'
```

#### Harder Questions

##### Elections
 - How many votes were cast in all of Bristol in the 2014 elections?
 ```
 SELECT SUM(Votes) FROM Candidate
 ```

 - How many votes were cast in the 'Windmill Hill' ward and what percentage of the electorate in this ward does this represent? Your statement should produce a table with one row and two columns called 'votes' and 'percentage'.
 ```
 SELECT SUM(Votes) AS votes, SUM(votes)/electorate * 100 AS percentage
 FROM Candidate
 JOIN Ward on Candidate.ward = Ward.id
 WHERE Ward.name = "Windmill Hill"
 ```
 - List the names, parties and percentage of votes obtained for all candidates in the Southville ward. Order the candidates by percentage of votes obtained descending.
 ```
 SELECT Candidate.name AS name, 
 Party.name As Party, 
 votes/(SELECT SUM(votes) 
    FROM Candidate 
    JOIN Ward ON Candidate.ward = Ward.id 
    WHERE Ward.name = "Southville") 
    * 100 AS percentage FROM Candidate
 JOIN Ward ON Candidate.ward = Ward.id 
 JOIN Party ON Candidate.party = Party.id
 WHERE Ward.name = "Southville"
 ORDER BY votes DESC
 ```

 - How successful (in % of votes cast) was the Conservative party in each ward?
 ```
 SELECT Ward.name AS ward, 
 votes/(
    SELECT SUM(votes)
    FROM Candidate
    WHERE ward = Ward.id
 )
 * 100 AS percentage
 FROM Candidate
 JOIN Ward ON Candidate.ward = Ward.id
 JOIN Party ON Candidate.party = Party.id
 WHERE Party.name = "Conservative"
 ```

 - Which rank did Labour end up in the 'Whitchurch Park' ward? Your statement should produce a table with a single row and column containing the answer as a number. You can assume no ties.
 ```
 WITH r AS (
    SELECT RANK() OVER (ORDER BY votes DESC) AS Rank, 
    Party.name as P 
    FROM Candidate
    JOIN Party ON Candidate.party = Party.id
    JOIN Ward ON Candidate.ward = Ward.id
    AND Ward.name = "Whitchurch Park")
 SELECT r.Rank
 FROM r
 WHERE r.p = "Labour"
 ```

 - What is the total number of votes that each party got in the elections? Your result should be a table with two columns party, votes.
```
SELECT Party.name AS party, SUM(votes) AS votes
FROM Candidate
JOIN Party ON Party.id = Candidate.Party
GROUP BY Party.name
```

 - Find all wards where the Green party beat Labour and create a table with two columns ward, difference where the difference column is the number of Green votes minus the number of Labour votes. Your table should be ordered by difference, with the highest one first.
 ```
 WITH Labour AS (
    SELECT Candidate.votes AS votes, Ward.name AS name
    FROM Candidate
    JOIN Party ON Candidate.party = Party.id
    JOIN Ward ON Candidate.ward = Ward.id
    WHERE Party.name = "Labour"
 ), 
 Green AS (
    SELECT Candidate.votes AS votes, Ward.name AS name
    FROM Candidate 
    JOIN Party ON Candidate.party = Party.id 
    JOIN Ward ON Candidate.ward = Ward.id
    WHERE Party.name = "Green
 )
 SELECT Ward.name AS ward, 
 (Green.votes - Labour.votes) AS difference 
 FROM Ward
 JOIN Green ON Green.name = Ward.name
 JOIN Labour ON Labour.name = Ward.name
 WHERE Green.votes > Labour.votes
 ORDER BY difference DESC
 ```

##### Census

 - How many women work in sales and customer service occupations and live in the Cabot ward of Bristol?
 ```
 SELECT Statistic.data
 FROM Statistic
 JOIN Occupation ON Statistic.occId = Occupation.id
 WHERE wardId = "E05001979" AND gender = 1 AND Occupation.name = "sales and customer service occupations"
 ```

 - How many people work in sales and customer service occupations and live in the Cabot ward of Bristol?
 ```
 SELECT SUM(Statistic.data)
 FROM Statistic 
 JOIN Occupation ON Statistic.occId = Occupation.Id
 WHERE wardId = "E05001979" AND Occupation.name = "sales and customer service operations"
 ```

 - How many people work in caring, leisure and other service occupations in all of the City of Bristol CLU?
 ```
 SELECT SUM(Statistic.data)
 FROM Statistic
 JOIN Ward ON Statistic.wardId = Ward.code
 WHERE occId = 6 AND Ward.parent = "E06000023"
 ```

 - In the Cabot ward, produce a table listing the names of the 9 occupation classes and the number of people in each of the classes in this ward.
 ```
 SELECT Occupation.name AS occupation, 
 SUM(Statistic.data) AS total
 FROM Statistic
 JOIN Occupation ON Statistic.occId = Occupation.id
 WHERE Statistic.wardId = "E05001979"
 GROUP BY Occupation.name
 ```

 - Find the working population, ward name and CLU name for the smallest ward (by working population) in the 2011 census.
 ```
 SELECT Ward.name AS ward, 
 SUM(Statistic.data) AS workingPop, 
 County.name AS CLU, 
 FROM Statistic
 JOIN Ward ON Statistic.wardId = Ward.code
 JOIN County ON Ward.parent = County.code 
 GROUP BY Ward.name
 ORDER BY SUM(Statistic.data) ASC
 LIMIT 1
 ```

 - The same as the last question, but now produce a table with two rows, one for the smallest and one for the largest ward. There's no quicker way than repeating the last query twice, the question is how to stick the two "copies" together.
 ```
 (SELECT Ward.name AS ward, 
 SUM(Statistic.data) AS workingPop, 
 County.name AS CLU
 FROM Statistic 
 JOIN Ward ON Statistic.wardId = Ward.code
 JOIN County ON Ward.parent = County.code
 GROUP BY Statistic.wardId
 ORDER BY SUM(Statistic.data) ASC
 LIMIT 1
 )
 UNION
 (SELECT Ward.name AS ward, 
 SUM(Statistic.data) AS workingPop, 
 County.name AS CLU
 FROM Statistic
 JOIN Ward ON Statistic.wardId = Ward.code 
 JOIN County ON Ward.parent = County.code
 GROUP BY Statistic.wardId
 ORDER BY SUM(Statistic.data) DESC 
 LIMIT 1
 )
 ```

 - Find the average size of a ward's working population in the London region.
 ```
 SELECT AVG(Statistic.data) AS average
 FROM Statistic
 JOIN Ward ON Statistic.wardId = Ward.code
 JOIN County ON Ward.parent = County.code
 JOIN Region ON County.parent = Region.code
 WHERE Region.code = "E12000007"
 ```

 - The same as the last question but now for every region—your query should produce a table with one row per region.
 ```
 SELECT AVG(Statistic.data) AS average, 
 Region.name AS Region 
 FROM Statistic
 JOIN Ward ON Statistic.wardId = Ward.code
 JOIN County ON Ward.parent = County.code
 JOIN Region ON County.parent = Region.code
 GROUP BY Region.code
 ```

 ### Week 10 Datalog 

 Random issues from this week:
 - The AbcDatalog interpreter doesn't support the OR operator syntax, so if you want to make an OR rule, you need to define 2 rules with the same name and paramters with the different components of the rule. 
 - The parameters of the datalog rules must be:
 - - lower case
 - - no strings

### Part 2
### Week 11 - HTTP

This week's lab involves running a basic client-server system across 2 terminals

#### Exploring HTTP

A source of issues may be due to vagrant, as you need to make sure that the student has the line:

```
config.vm.network "forwarded_port", guest: 8000, host: 8000
```

in their Vagrantfile.

Note that running wget on the `http-response` gives the wrong content. It results in the html version of the github page, NOT the contents of the file.

#### Research Exercises

 - The fragment part of a URL is an internal page reference which refers to a section within a web page. It usually appears at the end of a URL and begins with a #
 - The Accept header in HTTP defines the media types that the client can accept from the server
 - A User-Agent is a software agent used for retrieving web content and facilitating end-user interaction. 
 - Spaces in a URL are replaces with '%20' or '+'. Other characters which need encoding are: ':', '/', '?', '#', '[', ']', '@', '!'
 - The University website uses Apache for their server

#### A server in Java

This section goes through the basic structure of a spring boot API

To do the exercise for this section, you need the following code in Controller.java:

```
 @GetMapping("/bad")
    public ResponseEntity<String> badPage() {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, "text/plain");

        return new ResponseEntity<String>("Bad request, try again", headers, 404);
    }
```
