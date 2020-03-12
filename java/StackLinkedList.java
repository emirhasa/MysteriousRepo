//stack implementation with linked list

public class StackLinkedList {
    
    Node topOfStack;
    int size;

    public StackLinkedList() {
        topOfStack = null;
        size = 0;
    }

    public void Push(int value) {
        Node newTopOfStack = new Node();
        newTopOfStack.data = value;
        newTopOfStack.next = topOfStack;
        topOfStack = newTopOfStack;
        size++;
    }

    public int Pop() {
        if(size == 0 ) return 0;
        int tempValue = topOfStack.data;
        topOfStack = topOfStack.next;
        System.out.println("Removing: " + tempValue);
        size--;
        return tempValue;
    }

    public int Peek() {
        if(size > 0 ) {
            System.out.println("Peeking top of stack: " + topOfStack.data);
            return topOfStack.data;
        } else return 0;
    }

    public static void main(String[] args) {
        StackLinkedList stack = new StackLinkedList();
        stack.Push(5);
        stack.Pop();
        stack.Push(10);
        stack.Push(15);
        stack.Push(4);
        stack.Peek();
        stack.Pop();
        stack.Peek();
    }
}