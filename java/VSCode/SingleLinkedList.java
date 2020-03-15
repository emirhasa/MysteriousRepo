/* test

single linked list -> not circular
head -> point to the first node
node -> value, point to next node
tail -> point to null

//initialize
initialize node, head, tail

//add node
if location == first(0)
new node -> point to head
head = new node

if location == last(n-1)
new node
tail node -> point to new node instead of null
tail = null

if location != (first || last)
make new node
node point to next node
let previous node point to new node

//remove node
if location == first
head point to 2nd node
first node now eligible for garbage collection

if location == last 
next to last node points to null
new tail = next to last node
old tail node eligible for garbage collection


//remove linked list
remove head pointing to first node
all nodes sequentially become eligible for garbage collection

//traverse node
start from head
keep going through each node
while printing values
end at tail

//search nodes
start from head
traverse until found value

//time complexities:

initialize:
O(1)

add node:
O(n)

remove node:
O(n)

remove linked list:
O(1)

traverse:
O(n)

search:
O(n)

*/

public class SingleLinkedList 
{

    Node head;
    public SingleLinkedList() {
        head = null;
    }
    
    public void Insert(int value) {
        Node newNode = new Node();
        newNode.data = value;
        newNode.next = null;
        if(head == null) {
            head = newNode;
        } else {
            Node traverseNode = head;
            while(traverseNode.next != null ) {
                traverseNode = traverseNode.next;
            }
            traverseNode.next = newNode;
        }
    }

    public void InsertAt(int location, int value) {
        //insert at location means before the node which is the same number
        //e.g. location 0 is head so : before first node(0), location 3 is before node 3
        //so there are 3 situations: if location == 0, just insert at head position, else keep traversing and reduce location value until it's 0
        //what if location is bigger than node size? 
        //there are some solutions in this case we check in the while loop for 2 conditions -> did we reach the location and is the next node not null
        if(location == 0 ) {
            Node newNode = new Node();
            newNode.data = value;
            newNode.next = head;
            head = newNode;
        } else {
            Node traverseNode = head;
            while((location - 1 )> 0 && traverseNode.next != null ) {
                location--;
                traverseNode = traverseNode.next;
            }
            //we're now at the tail or required location
            Node newNode = new Node();
            newNode.data = value;
            newNode.next = traverseNode.next;
            traverseNode.next = newNode;
        }
    }

    //delete first
    public boolean Delete() {
        if(head == null ) {
            return false;
        } else {
            head = head.next;
            return true;
        }
    }

    //delete at some location
    public boolean DeleteAt(int location) {
        if(head == null ) {
            return false;
        } else {
            if(location == 0) {
                if(head.next == null ) {
                    head = null;
                    return true;
                } else {
                    head = head.next;
                    return true;
                }
            }
            Node traverseNode = head;
            while((location - 1) > 0 && traverseNode.next != null) {
                location--;
                if(traverseNode.next.next != null )
                traverseNode = traverseNode.next;
            }
            //we're now at the required location
            //if the node where we arrived is surrounded is different than if it's just tail
            if(traverseNode.next.next != null) {
                traverseNode.next = traverseNode.next.next;
                return true;
            } else {
                traverseNode.next = null;
                return true;
            }
        }
    }

    public boolean Traverse() {
        if(this.isEmpty()) {
            return false;
        } else {
            System.out.println(head.data);
            Node n = head;
            while(n.next != null) {
                n = n.next;
                System.out.println(n.data);
            }
            return true;
        }
    }

    public boolean isEmpty() {
        return head == null;
    }

    public static void main(String[] args) {
        SingleLinkedList list = new SingleLinkedList();
        list.Insert(5);
        list.Insert(10);
        list.InsertAt(0, 20);
        list.Traverse();
        list.Insert(30);
        list.DeleteAt(0);
        list.Traverse();
    }

}