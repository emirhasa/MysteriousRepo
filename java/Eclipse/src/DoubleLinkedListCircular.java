
public class DoubleLinkedListCircular {

	int size;
	DNode head; // DNode = double node, with previous and next
	DNode tail;
	
	public DoubleLinkedListCircular() {
		size = 0;
		head = tail = null;
	}
	
	public void Insert(int location, int value) {
		//4 types of insert:
		//1. at beginning when no nodes,
		//2. at beginning,
		//3. at end and 
		//4. between nodes
		DNode newNode = new DNode();
		newNode.data = value;
		if(size == 0) {
			newNode.previous = newNode;
			newNode.next = newNode;
			head = tail = newNode;
			size++;
			return;
		}
		if(location == 0) {	
			newNode.next = head;
			newNode.previous = tail;
			head.previous = newNode;
			head = newNode;
			tail.next = head;
			size++;
			return;
		}
		if(location >= size) {
			tail.next = newNode;
			newNode.previous = tail;
			newNode.next = head;
			tail = newNode;
			head.previous = tail;
			size++;
			return;
		}
		//else is inserting between nodes, so traverse the required distance
		//should be optimized to not only traverse forward but backwards if it's closer that way
		//optimize by halving size. if location > size / 2 then traverse backwards
		DNode traverseNode = head;
		int movesLeft = --location;
		while(movesLeft > 0 ) {
			movesLeft--;
			traverseNode = traverseNode.next;
		}
		//now we're at the required place
		newNode.next = traverseNode.next;
		newNode.previous = traverseNode;
		traverseNode.next = newNode;
		traverseNode.next.previous = newNode;
		size++;
		return;
	}
	
	public void TraverseForward() {
		if(size == 0) return;
		System.out.println("---Traversing forward---");
		DNode traverseNode = head;
		System.out.println(traverseNode.data);
		for(int i=0; i < (size-1);i++) {
			traverseNode = traverseNode.next;
			System.out.println(traverseNode.data);
		}
		System.out.println("---End---");
		return;
	}
	
	public void TraverseBackward() {
		if(size == 0) return;
		System.out.println("---Traversing backward---");
		DNode traverseNode = tail;
		System.out.println(traverseNode.data);
		for(int i=0;i<(size-1);i++) {
			traverseNode = traverseNode.previous;
			System.out.println(traverseNode.data);
		}
		System.out.println("---End---");
		return;
	}
	
	
	public static void main(String[] args) {
		DoubleLinkedListCircular list = new DoubleLinkedListCircular();
		list.Insert(0, 5);
		list.Insert(0, 10);
		list.Insert(5, 2);
		list.Insert(0, 9);
		list.TraverseForward();
		list.TraverseBackward();
	}
	
}
