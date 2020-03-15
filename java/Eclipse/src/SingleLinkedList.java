
public class SingleLinkedList {
	
	int size;
	Node head;
	Node tail;
	
	public SingleLinkedList() {
		size = 0;
		head = tail = null;
	}
	
	public void Insert(int location, int value) {
		Node newNode = new Node();
		newNode.data = value;
		//first node == 0
		if(size == 0) {
			newNode.next = null;
			head = tail = newNode;
			size++;
			return;
		} 
		if(location == 0) {
			newNode.next = head;
			head = newNode;
			size++;
			return;
		}
		if(location >= size) {
			//if location equal or greater than size then inserting at end
			newNode.next = null;
			tail.next = newNode;
			tail = newNode;
			size++;
			return;
		}
		Node traverseNode = head;
		//move as many places as (location - 1)
		//e.g. if we're inserting at location 1 we move 0 places, location 2 we move 1 time etc.
		//that way we get one node before the place of insertion
		int moveTimes = --location;
		while (moveTimes > 0 ) {
			traverseNode = traverseNode.next;
			moveTimes--;
		}
		newNode.next = traverseNode.next;
		traverseNode.next = newNode;
		size++;
		return;
	}
	
	public boolean Delete(int location) {
		if(size == 0) return false;
		if(size == 1) {
			size--;
			head = tail = null;
			return true;
		}
		if(location == 0) {
			if(head.next != null) {
				head = head.next;
				return true;
			} else {
				head = tail = null;
				size = 0;
				return true;
			}
		}
		//since we're deleting the formula is just a bit different for determining when we're deleting from the end
		//so in this case it's not equal to or greater than size but equal to or greater than (size - 1)
		Node traverseNode = head;
		int moveTimes = --location;
		if(location >= (size-1)) {
			while (moveTimes > 0) {
				traverseNode = traverseNode.next;
				moveTimes--;
			}
			traverseNode.next = null;
			tail = traverseNode;
			size--;
			return true;
		}
		//move until we're one node ahead of the node we need to delete
		//same formula as for inserting
		while(moveTimes > 0 ) {
			traverseNode = traverseNode.next;
			moveTimes--;
		}
		Node tempNode = traverseNode.next;
		//delete the node by "skipping it" by pointing to the node after deletion
		traverseNode.next = tempNode.next;
		size--;
		return true;
	}
	
	public void Traverse() {
		if(size == 0) return;
		Node traverseNode = head;
		System.out.println(head.data);
		while(traverseNode.next != null) {
			traverseNode = traverseNode.next;
			System.out.println(traverseNode.data);
		}
	}
	
	public boolean Search(int value) {
		if(size == 0) return false;
		Node traverseNode = head;
		if(traverseNode.data == value) return true;
		for(int i = 0; i<(size-1);i++) {
			traverseNode = traverseNode.next;
			if(traverseNode.data == value) return true;
		}
		return false;
	}
	
	public Node GetHead() {
		if(size > 0) {
			return head;
		} return null;
	}
	
	public Node GetTail() {
		if(size > 0) {
			return tail;
		} return null;
	}
	
	public int GetSize() {
		return size;
	}
	
	public static void main(String[] args) {
		SingleLinkedList list = new SingleLinkedList();
		if(list.GetHead() == null) System.out.println("Lista nema clanova");
		list.Insert(0, 5);
		list.Insert(0, 10);
		list.Insert(3,  50);
		list.Delete(0);
		
		list.Insert(1,  20);;
		list.Insert(1, 4);
		list.Traverse();
	}
	
}
