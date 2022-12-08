import pytest


@pytest.mark.parametrize("a,b,expected", [(3, 5, 8), (2, 4, 6)])
def test_foo(a: int, b: int, expected: int) -> None:
    assert a + b == expected
