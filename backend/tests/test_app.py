import pytest

from app import __version__


@pytest.mark.anyio
async def test_version():
    assert __version__ == "0.1.0"
