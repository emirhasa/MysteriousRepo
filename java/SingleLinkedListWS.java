public class SingleLinkedListWS {

    Node head;
    Node tail;
    int size;

    public SingleLinkedListWS() {
        head = tail = null;
        size = 0;
    }

    public void Insert(int location, int value) {
        if( location > size) return;
        Node newNode = new Node();
        newNode.data = value;
        if( location == 0 ) {
            if(head == null) {
                //if this was first node 
                newNode.next = null;
                head = tail = newNode;
                size++;
            } else {
                newNode.next = head;
                head = newNode;
                size++;
            }
        } else {
            Node traverseNode = head;
            for(int i = 0; i < (location-1); i ++ ) {
                traverseNode = traverseNode.next;
            }
            if(traverseNode.next == null ) {
                //if at end of linked list
                newNode.next = null;
                traverseNode.next = newNode;
                tail = newNode;
                size++;
            } else {
                newNode.next = traverseNode.next;
                traverseNode.next = newNode;
                size++;
            }
        }
    }

    public void Traverse() {
        if(size == 0 ) return;
        Node traverseNode = head;
        System.out.println("---------");
        while(traverseNode != null) {
            System.out.println(traverseNode.data);
            traverseNode = traverseNode.next;
        }
        System.out.println("---------");
    }

    public int GetTail() {
        return tail.data;
    }

    public int GetHead() {
        return head.data;
    }

    public void Delete(int location) {
        if(location > size ) return;
        if(location == 0 ) {
            if( head.next != null ) {
                head = head.next;
            } else {
                head = null;
            }
        } else {
            Node traverseNode = head;
            for(int i = 0; i < (location - 1); i ++) {
                traverseNode = traverseNode.next;
            }
            //if last element is tail
            Node tempNode = traverseNode.next;
            if(tempNode.next == null ) {
                traverseNode.next = null;
                tail = traverseNode;
            } else {
                //else link to the node after the one which we're deleting
                traverseNode.next = tempNode.next;
            }
        }
        
    }

    public static void main(String[] args) {
        SingleLinkedListWS list = new SingleLinkedListWS();
        list.Insert(0,5);
        list.Insert(0,10);
        list.Insert(1,15);
        list.Insert(3,4);
        list.Traverse();
    }

}