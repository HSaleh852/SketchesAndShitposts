
//Attempt to be funny (didn't work)

static class Assert
{
    static DummyAssert d = new DummyAssert();
    public static DummyAssert That(object value, Is cond)
    {
        cond.TestAgainst(value);
        return d;
    }
    public class DummyAssert
    {
        public DummyAssert Dude() { return this; }
        public DummyAssert Thanks() { return this; }
    }
}

class Is
{
    Predicate<object> pred { get; set; }
    Is(Predicate<object> pred)
    {
        this.pred = pred;
    }
    Is() { }
    public virtual void TestAgainst<T>(T value)
    {
        if (!pred(value)) throw new Exception();
    }

    public class Like : Is { }
    public class Not : Is
    {
        public new class Like : Not { }
        public override void TestAgainst<T>(T value)
        {
            if (pred(value)) throw new Exception();
        }
        Not(Predicate<object> pred)
        {
            this.pred = pred;
        }
        Not() { }
        public static new Not EqualTo<T>(T x)
        {
            return new Not(y => x.Equals(y));
        }
        public static new Not OneOf<T>(IEnumerable<T> x)
        {
            return new Not(y => x.Where(z => z.Equals(y)).Count() > 0);
        }
        public static new Not OfType<T>(T x)
        {
            return new Not(y => x.GetType() == y.GetType());
        }
        public static new Not AssignableTo<T>(T x)
        {
            return new Not(y => typeof(T).IsAssignableFrom(y.GetType()));
        }
    }
    public static Is EqualTo<T>(T x)
    {
        return new Is(y => x.Equals(y));
    }
    public static Is OneOf<T>(IEnumerable<T> x)
    {
        return new Is(y => x.Where(z => z.Equals(y)).Count() > 0);
    }
    public static Is OfType<T>(T x)
    {
        return new Is(y => x.GetType() == y.GetType());
    }
    public static Is AssignableTo<T>(T x)
    {
        return new Is(y => typeof(T).IsAssignableFrom(y.GetType()));
    }
}