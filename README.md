# Sort Hosts

A Visual Studio Code Extension.
Sort hostnames by top-level domain, second-level domain ...

## Example

Input:
```text
www.example.net,www.example.com
example.com;example.org
www.example.org example.net
```

Output:
```text
example.com
www.example.com
example.net
www.example.net
example.org
www.example.org
```

## Usage

1.  Select lines.
    If no line is selected, the entire text is covered.
2.  Press Ctrl+Shift+P or F1 to show *Command Palette*.
3.  Execute **Sort Hosts**.
