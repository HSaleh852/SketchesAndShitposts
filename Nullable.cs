class Nullable<T>
{
    public bool HasValue { private set; get; }
    T t;
    public Nullable()
    {
        HasValue = false;
    }
    public Nullable(T t)
    {
        HasValue = true;
        this.t = t;
    }
    public T Value
    {
        get
        {
            if (!HasValue)
                throw new Exception("is null blah blah");
            return t;
        }
        set
        {
            if (value == null)
                HasValue = false;
            else
            {
                HasValue = true;
                t = value;
            }
        }
    }
    public static implicit operator Nullable<T>(T t)
    {
        return t == null ? new Nullable<T>() : new Nullable<T>(t);
    }
    public static implicit operator T(Nullable<T> n)
    {
        if (n == null||!n.HasValue)
            throw new Exception("is null blah blah");
        return n.Value;
    }
}