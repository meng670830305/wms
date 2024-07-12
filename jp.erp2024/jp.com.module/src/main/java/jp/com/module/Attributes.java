package jp.com.module;

public class Attributes {
	private String title;
	private String href;
	private boolean hasChildren;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public Attributes(String title, String href, boolean hasChildren) {
		super();
		this.title = title;
		this.href = href;
		this.hasChildren = hasChildren;
	}

	public boolean isHasChildren() {
		return hasChildren;
	}

	public void setHasChildren(boolean hasChildren) {
		this.hasChildren = hasChildren;
	}

}
